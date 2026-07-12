# Coding Optimization Example

This example demonstrates how TokenGuardian optimizes code generation by returning code immediately and removing explanatory boilerplate.

---

## 🙋 User Prompt
> Write a quicksort implementation in Python.

---

## ❌ Normal Response
> Certainly! Quicksort is a popular divide-and-conquer sorting algorithm. Here is a clean implementation of the quicksort algorithm in Python.
> 
> ```python
> def quicksort(arr):
>     if len(arr) <= 1:
>         return arr
>     pivot = arr[len(arr) // 2]
>     left = [x for x in arr if x < pivot]
>     middle = [x for x in arr if x == pivot]
>     right = [x for x in arr if x > pivot]
>     return quicksort(left) + middle + quicksort(right)
> ```
> 
> ### How it works:
> 1. **Pivot Selection**: The algorithm selects a pivot element (in this case, the middle element of the array).
> 2. **Partitioning**: It creates three sub-lists: elements smaller than the pivot, elements equal to the pivot, and elements larger than the pivot.
> 3. **Recursion**: It recursively sorts the left and right sub-lists and combines them.
> 
> You can test it like this:
> ```python
> print(quicksort([3, 6, 8, 10, 1, 2, 1]))
> # Output: [1, 1, 2, 3, 6, 8, 8, 10]
> ```
> Let me know if you need to optimize it further or want an in-place version!

* **Tokens used**: ~235 tokens.

---

##  Optimized TokenGuardian Response
```python
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)
```

* **Tokens used**: ~72 tokens.

---

## 📊 Token Savings Analysis

* **Normal Response Tokens**: 235
* **TokenGuardian Response Tokens**: 72
* **Total Tokens Saved**: 163 tokens
* **Output Token Reduction**: **69.3%**
* **Why it saved tokens**: Pre-empted and deleted the introduction, the step-by-step logic breakdown, the test-case demonstration, and the conversational closing. Code is outputted directly.
