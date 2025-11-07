---
title: "Bachelor's Thesis: High-Performance Flow Simulation"
date: 2024-07-01T10:00:00+01:00
draft: false
description: "Semi-implicit numerical method for simulating compressible flows in elastic pipe networks, achieving 90× speedup with GPU acceleration."
tags: ["Research", "Numerical Methods", "GPU Computing", "Fluid Dynamics"]
featured: true
---

## Bachelor's Thesis

**Full Title:** A High-Performance Semi-Implicit Numerical Method for the Simulation of Compressible Flows in Systems of Compliant Elastic Pipes

**Author:** Luca Boscarato  
**Degree:** Bachelor in Computer Science (110 cum laude)  
**Institution:** Free University of Bolzano (UNIBZ)  
**Date:** July 2024  
**Supervisors:** Prof. Maurizio Tavelli, Prof. Bruno Carpentieri

---

## Overview

This is my bachelor's thesis, completed in 2024 as part of my Computer Science degree at the Free University of Bolzano. I graduated with **110 cum laude**, and this work represents a significant milestone in my academic journey.  
The thesis was completed under the supervision of **Prof. Maurizio Tavelli** and co-supervision of **Prof. Bruno Carpentieri**, as part of the PRIN project *"Hybrid Transient–Machine Learning Approach for Anomaly Detection and Classification in Water Transmission Mains (TANDEM)"*.

## Abstract

The objective of this thesis is to implement a **semi-implicit numerical method** for simulating **compressible fluid flows** in systems of **compliant elastic pipes**. Detecting and locating water leakages in pipe networks is a major societal challenge, and this project contributes to that goal by developing an efficient tool for dataset generation—used to train neural network models for leak detection.

The discretization of the governing PDEs leads to a **nonlinear system** of equations, which is solved via a **Nested Newton Method**. Each iteration linearizes the system and solves it using the **Conjugate Gradient Method (CGM)**, exploiting the matrix’s **Symmetric Positive Definite (SPD)** structure. A custom **preconditioner** based on the **Thomas algorithm** is introduced to accelerate convergence.

The solver is implemented in **Fortran** for efficiency, with additional **CUDA GPU acceleration**. The results show a speed-up of up to **90×** compared to the previous MATLAB version, with further performance gains achieved via parallelization.

---

## Key Contributions

- Development of a **semi-implicit numerical method** for compressible fluid flow in elastic pipe networks.  
- Implementation of a **Nested Newton–Conjugate Gradient solver** with a custom **preconditioner**.  
- Integration of **Fortran** and **CUDA** for high-performance simulation and GPU parallelization.  
- Validation against benchmark problems (Riemann problems, Modena real-world network).  
- Achieved **up to 90× speedup** over MATLAB implementations.  

---

## Research Highlights

- The numerical scheme is **unconditionally stable** for any choice of Δt due to the semi-implicit discretization.
- Real-world water networks (like **Modena**) can be efficiently simulated with over **1.5 million unknowns**.
- The method demonstrated consistent correctness when validated against **theoretical** and **literature benchmarks**.
- The **GPU-accelerated version** achieved convergence with preconditioning even for large-scale systems.

---

## Technical Approach

The governing physical model is derived from the **compressible Navier–Stokes equations** and solved using a semi-implicit scheme.  
The discrete system is built as:

$$
\frac{\partial \rho}{\partial t} + \nabla \cdot (\rho u) = 0, \quad
\frac{\partial (\rho u)}{\partial t} + \nabla \cdot (\rho u \otimes u) + \nabla p = \nabla \cdot \sigma
$$

The **continuity** and **momentum** equations are discretized using **finite-volume** and **upwind** schemes. The resulting nonlinear mass equation:

$$
M_i^{n+1} = M_i^n + \Delta t \sum_{j \in S_i} A_j U_j^{n+1} - S_i^f
$$

is coupled with a semi-implicit velocity update:

$$
U_j^{n+1} = F_U^n - \frac{g \Delta t}{\Delta x} (Ph_{r(j)}^{n+1} - Ph_{l(j)}^{n+1}) - F_f^n U_j^{n+1}
$$

which leads to the final nonlinear system:

$$
M_i^{n+1} + \frac{g \Delta t^2}{\Delta x} \sum_{j \in S_i} 
\frac{1}{1 + F_{f,j}} A_j (Ph_{r(j)}^{n+1} - Ph_{l(j)}^{n+1})
= M_i^n + \Delta t \sum_{j \in S_i} \frac{1}{1 + F_{f,j}} A_j F_U^n - S_i^f
$$

This system is solved using a **Nested Newton–Conjugate Gradient** approach. The preconditioner is defined as:

$$
M = T, \quad \text{where } A = T + E
$$

and $T$ is the **tridiagonal** part of $A$, solved using the **Thomas algorithm** to improve convergence:

$$
M^{-1} A x = M^{-1} b
$$

---

## Results

| Test Case | MATLAB | CPU (No Prec.) | CPU (Prec.) | GPU (No Prec.) | GPU (Prec.) |
|------------|---------|----------------|--------------|----------------|--------------|
| Single Pipe (Ns=2000) | 95920.9 ms | 2535.2 ms | 1655.3 ms | 1995.8 ms | **1578.4 ms** |
| Simple Network (Ns=1000) | 173002.0 ms | 4338.0 ms | 2431.1 ms | 3394.1 ms | **2440.0 ms** |
| RP1 (Ns=2000) | 15804.6 ms | 602.2 ms | **132.2 ms** | 1624.5 ms | 1188.6 ms |
| RP2 (Ns=200) | 13802.9 ms | **24.2 ms** | 25.7 ms | 367.8 ms | 352.9 ms |
| Modena (Ns=1.4M) | N/A | N/A | 3,104,890.6 ms | N/A | **2,536,750.4 ms** |

- GPU and preconditioning combined led to a **substantial convergence acceleration**.
- Large-scale simulations (e.g., Modena) completed successfully with **1.5 million unknowns**.
- The method achieved **numerical stability** and **physical accuracy** even in highly nonlinear cases.

---

## Future Work

- Implement the **entire solver in CUDA** to minimize CPU–GPU communication overhead.  
- Extend the model to include **additional real-world phenomena** such as temperature variation and nonlinear elasticity.  
- Integrate the simulation pipeline with **machine learning models** for real-time leak detection and classification.  
- Explore **adaptive meshing** and **dynamic time-stepping** for further computational efficiency.  

---

## Download

📄 **[Download Thesis (PDF)](/files/Thesis.pdf)**

---

*This thesis was completed under the supervision of **Prof. Maurizio Tavelli** and co-supervision of **Prof. Bruno Carpentieri** at the Free University of Bolzano (UNIBZ).*