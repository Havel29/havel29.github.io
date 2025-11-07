---
title: "8six - THJCC Winter 2024"
date: 2024-12-15
description: "Lattice-based cryptography challenge using LLL algorithm to recover hidden values"
tags: ["crypto", "lattice", "lll", "sage"]
difficulty: "Hard"
solves: 1
ctf: "THJCC Winter 2024"
category: "Cryptography"
draft: false
---

## Challenge Overview

**Challenge:** 8six  
**Category:** Crypto  
**Difficulty:** Hard  
**Solves:** 5/172 
**Points:** 500

The challenge consists in solving a linear system of equations over the ring $\mathbb{Z}_M,$ where $M \in [2^{8191}, 2^{8192}) $.

## Looking at the Source Code

Let's start by examining what we're given. The encryption script (`enc.sage`) shows us the process:

```python
from Crypto.Util.number import bytes_to_long
from secrets import NAME, SIGN
from random import randint

assert(len(NAME)==11)
M = randint(2**8191, 2**8192)
seed = [randint(2**8191, 2**8192) for _ in range(7)]

r = 0
for i in range(6):
    r = (r + SIGN[i]*seed[i]) % M
r = (r + bytes_to_long(NAME)*seed[6]) % M

print(f"M = {M}")
print(f"r = {r}")
print(f"seed = {seed}")
```

The challenge hides the secret values in a separate `secrets.py` module:

```python
# secrets.py (hidden from players)
NAME = b"reallyCool1"  # What we need to find
SIGN = b"763464"       # What we need to find
```

So we have the modulus `M`, the result `r`, and the seven random `seed` values. We need to solve:

$$r \equiv \sum_{i=0}^{5} \text{SIGN}[i] \cdot \text{seed}[i] + \text{NAME} \cdot \text{seed}[6] \pmod{M}$$

where NAME and SIGN[0:6] are our unknowns.

## The Key Insight

Looking at this equation, something immediately stands out. The coefficients we're looking for (`SIGN[i]` and `NAME`) are **tiny** compared to the modulus:

- `SIGN[i]` values are ASCII digits, so they're in range [48, 57] 
- `NAME` as an 11-byte string converted to integer is still relatively small
- Meanwhile, `M` and the `seed` values are massive (~8192 bits each)

This disparity screams **lattice reduction**. When you have small coefficients in a linear combination with large numbers, LLL often comes to the rescue.

## Using LLL

We use LLL to find short vectors in a carefully constructed lattice. The idea is to build a lattice where our target vector (containing the small coefficients) will be the shortest.

We construct this lattice matrix:

```
[1  0  0  0  0  0  0  seed[0]]
[0  1  0  0  0  0  0  seed[1]]
[0  0  1  0  0  0  0  seed[2]]
[0  0  0  1  0  0  0  seed[3]]
[0  0  0  0  1  0  0  seed[4]]
[0  0  0  0  0  1  0  seed[5]]
[0  0  0  0  0  0  1  seed[6]]
[0  0  0  0  0  0  0      r  ]
[0  0  0  0  0  0  0      M  ]
```

We use this lattice since it will (ideally) yield us the vector `[SIGN[0], SIGN[1], SIGN[2], SIGN[3], SIGN[4], SIGN[5], NAME, k]` where `k` is some small integer. Hence we can extract the individual ASCII digits and the NAME bytes from the first reduced vector.

## Solution Implementation

```python
from Crypto.Util.number import bytes_to_long, long_to_bytes

# Given values from challenge output
r = 964525376945240449294376517543528422618394922945417435299221523347609706786385...
M = 558963296217640068614199236885071567161930361440227214102067371907810625189399...
seed = [895749310030956330541767773251890224161636372327236092885849438273343783261670..., ...]

# Build the lattice matrix
dim = len(seed) + 1
mat = [[0 for _ in range(dim + 1)] for _ in range(dim + 1)]

# Identity matrix for coefficients
for i in range(len(seed)):
    mat[i][i] = 1
    mat[i][-1] = seed[i]  # Last column contains seeds

# Add constraint row
mat[len(seed)][len(seed)] = 1
mat[len(seed)][-1] = r

# Add modulus
mat[dim][dim] = M

# Convert to SageMath matrix and apply LLL
mat = Matrix(ZZ, mat)
row = mat.LLL()[0]

# LLL gives us negative coefficients
row = [r*-1 for r in row]

# Recover the values
username = long_to_bytes(row[-3])  # This should be NAME
numbers = b""
for el in row[:-3][::-1]:
    numbers += chr(el).encode()   # These should be SIGN digits

flag = b"THJCC{" + username + numbers + b"}"
print(flag)
```
###

Note: in the writeup, I mentioned only briefly why the lattice is built in such a way, a more comprehensive and enjoable tour is offered by magicfrank on his **[blog](https://magicfrank00.github.io/writeups/posts/lll-to-solve-linear-equations/)**.