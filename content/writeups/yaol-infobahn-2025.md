---
title: "YAOL - Infobahn CTF 2025"
date: 2025-11-09
description: "Discrete logarithm challenge exploiting p^3 modulus structure using p-adic methods"
tags: ["crypto", "discrete-log", "p-adic", "number-theory"]
difficulty: "Easy"
solves: 63
ctf: "Infobahn CTF 2025"
category: "Cryptography"
draft: false
---

##  Challenge Overview  

**Challenge:** YAOL

**Category:** Crypto

**Difficulty:** Easy

**Solves:** 63

  

We're given a compact Python one-liner that performs modular exponentiation:

  

```python

print(pow(5, int.from_bytes(b"infobahn{redacted}"),

1630517278473550194282041875833486355623215533573046940060264097136914038603536518992736923653676649116183817847560673180565058236761676707835672941973386700920193823734995675702699))

# Output: 1205311994677213080553672976329272430376280336788757947479560449449519106113423651935986946100928433620706242735988889202701964570414180506408210904986303602097717823742023879116357

```

  

We know:

-  **Generator:** $g = 5$

-  **Modulus:** $n$

-  **Target:** $h = g^m \bmod n$, where $m$ encodes the flag

-  **Goal:** Recover $m$

  

At first glance, this looks like a hard discrete logarithm problem. But factoring the modulus reveals that **it's the cube of a prime number**, hence $n = p^3$. This changes everything!

  

##  Why $p^3$ Is Special

  

In a standard discrete logarithm problem modulo a large prime $p$, solving for $m$ is infeasible. However, if the modulus is a **prime power** $p^k$ (with $k > 1$), the structure becomes exploitable using **p-adic methods**.

  

**Lifting** means finding a solution modulo a higher power of $p$ that is consistent with a lower-power solution — i.e., from $\bmod p$ to $\bmod p^2$, $\bmod p^3$, and so on.

  

This is the foundation of **Hensel's Lemma** and **p-adic analysis**, which allow us to convert multiplicative problems into additive ones using p-adic logarithms.

  

##  The p-adic Approach

  

The entire trick relies on three observations:

  

1.  **Hensel's Lemma** lets us lift solutions from $\bmod p \rightarrow  \bmod p^2  \rightarrow  \bmod p^3$

2. For numbers congruent to $1  \pmod{p}$, we can compute a **p-adic logarithm**:

$$\log(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots$$

3. Once in the logarithmic domain **multiplication becomes addition**, making the discrete log problem easy!


###  Step 1: Simplifying the Base

  

Since $p$ is odd, $p-1$ is even. Let:

$$q = \frac{p-1}{2}$$

  

By Fermat's Little Theorem:

$$g^{p-1} \equiv  1  \pmod{p}$$

  

Hence:

$$(g^q)^2 = g^{p-1} \equiv  1  \pmod{p}$$

  

So $g^q \equiv  \pm  1  \pmod{p}$, since it is the square root of 1 (mod $p$).

  

Now define:

$$a = g^q \bmod p^3, \quad b_q = h^q \bmod p^3$$

  

For a primitive root $g$, both $a$ and $b_q$ satisfy:

$$a \equiv  1  \pmod{p}, \quad b_q \equiv  1  \pmod{p}$$

  

Thus, we can write:

$$a = 1 + pk_1, \quad b_q = 1 + pk_2$$

  

for some integers $k_1, k_2$. These are now suitable for applying the p-adic logarithm!

  

### Step 2: Computing p-adic Logarithms

  

For numbers $x \equiv  1  \pmod{p}$, the p-adic logarithm is:

$$\log_p(x) = (x-1) - \frac{(x-1)^2}{2} + \frac{(x-1)^3}{3} - \cdots$$

  

Modulo $p^3$, higher powers vanish quickly, so we only need a few terms.

  

From the congruence:

$$a^m \equiv b_q \pmod{p^3}$$

  

taking logarithms gives:

$$m \cdot  \log_p(a) \equiv  \log_p(b_q) \pmod{p^3}$$

  

Dividing both sides yields:

$$m \bmod p^2 = \frac{\log_p(b_q) / p}{\log_p(a) / p} \pmod{p^2}$$

  

Since the flag length is only 43 bytes (≈344 bits) and $p^2$ is around the same size, **this already gives the entire message!**

  

###  Step 3: Lifting to the Full Solution

  

Once $m \bmod p^2$ is known, verify:

- $g^m \equiv h \pmod{p}$

- $g^m \equiv h \pmod{p^3}$

  

If both hold, the recovered value is the full exponent.

  

## Solve Script

  

Here's the complete solve script with detailed comments:

  

```python

# Challenge parameters
g = 5
mod = 1630517278473550194282041875833486355623215533573046940060264097136914038603536518992736923653676649116183817847560673180565058236761676707835672941973386700920193823734995675702699
p = 1176996401679752890373209353249071857076030810114990527710899
h = 1205311994677213080553672976329272430376280336788757947479560449449519106113423651935986946100928433620706242735988889202701964570414180506408210904986303602097717823742023879116357
FLAG_LEN = 43

# 1) Some useful variables to be kept
p2, p3 = p*p, mod
q = (p-1)//2  # half of p-1

  

def padic_log_1px(x, p, mod_p3):
	"""
	Compute the p-adic logarithm of (1 + x) modulo p^3.
	Uses: log(1+x) = x - x^2/2 + x^3/3 - x^4/4 + ...
	Converges quickly since higher powers of p vanish mod p^3.
	"""
    res = 0
    term = x % mod_p3
    k, sign = 1, 1
    while term:
        invk = pow(k, -1, mod_p3)
        add = (term * invk) % mod_p3
        if sign < 0:
            add = (-add) % mod_p3
        res = (res + add) % mod_p3
        k += 1
        sign *= -1
        term = (term * x) % mod_p3
        if k > 20:  # plenty for p^3 precision
            break
    return res

# Note: implementation above is provided for clarity, but sagemath offers built-in functions.
"""
def padic_log_1px_sage(x, p, mod_p3):
    return Integer(Zp(p, prec=3)(1 + x).log()) % mod_p3
"""

# 2) p-adic logs
loga = padic_log_1px((a - 1) % p3, p, p3)
logb = padic_log_1px((bq - 1) % p3, p, p3)

# 3) Solve for m mod p^2
m_mod_p2 = ((logb // p) * pow((loga // p) % p2, -1, p2)) % p2

# 4) Verify and reconstruct flag
assert  pow(g, m_mod_p2, p) == (h % p)
m = m_mod_p2
assert  pow(g, m, mod) == h
flag = m.to_bytes(FLAG_LEN, "big").decode()
print(flag)
```

  

### Output

  

```

infobahn{y3t_an0th3r_d15cr3t3_l0g_ch4ll3ng3}

```  

## References

  

- [p-adic Numbers in Cryptography](https://en.wikipedia.org/wiki/P-adic_number)