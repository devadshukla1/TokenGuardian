# Debugging Optimization Example

This example demonstrates how TokenGuardian optimizes code debugging by emitting unified diffs or targeted functional modifications instead of reprinting large, unmodified files.

---

## 🙋 User Prompt
> Fix the off-by-one error in this binary search script:
> ```python
> def binary_search(arr, target):
>     low = 0
>     high = len(arr)
>     while low <= high:
>         mid = (low + high) // 2
>         if arr[mid] == target:
>             return mid
>         elif arr[mid] < target:
>             low = mid + 1
>         else:
>             high = mid
>     return -1
> ```

---

## ❌ Normal Response
> The bug in your binary search script is located in the initialization of the `high` index and how you update the boundaries in the `else` block. 
> 
> Because you are initializing `high = len(arr)`, the valid indices of your list are from `0` to `len(arr) - 1`. In your loop condition `while low <= high`, if the target is larger than all elements, `high` will cause an `IndexError`. Also, you should update `high` to `mid - 1` rather than `mid` to narrow down the search space correctly and avoid an infinite loop.
> 
> Here is the corrected, full script:
> 
> ```python
> def binary_search(arr, target):
>     low = 0
>     high = len(arr) - 1  # Fixed: high should be len(arr) - 1
>     while low <= high:
>         mid = (low + high) // 2
>         if arr[mid] == target:
>             return mid
>         elif arr[mid] < target:
>             low = mid + 1
>         else:
>             high = mid - 1  # Fixed: high should be mid - 1
>     return -1
> ```
> 
> Now, if you run this with `binary_search([1, 2, 3, 4, 5], 5)`, it will correctly return `4` without crashing or looping infinitely! Let me know if you have any questions!

* **Tokens used**: ~284 tokens.

---

##  Optimized TokenGuardian Response
```diff
 def binary_search(arr, target):
     low = 0
-    high = len(arr)
+    high = len(arr) - 1
     while low <= high:
         mid = (low + high) // 2
         if arr[mid] == target:
             return mid
         elif arr[mid] < target:
             low = mid + 1
         else:
-            high = mid
+            high = mid - 1
     return -1
```

* **Tokens used**: ~104 tokens.

---

## 📊 Token Savings Analysis

* **Normal Response Tokens**: 284
* **TokenGuardian Response Tokens**: 104
* **Total Tokens Saved**: 180 tokens
* **Output Token Reduction**: **63.4%**
* **Why it saved tokens**: Rewrote the entire explanation and corrected script into a unified diff. Diffs allow developers to immediately see changes without parsing long textual explanations, saving substantial reading time and token cost.
