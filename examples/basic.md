# Basic Conversational Optimization Example

This example demonstrates how TokenGuardian eliminates polite boilerplate and conversational wrappers for a standard, simple factual query.

---

## 🙋 User Prompt
> What is the capital of Australia?

---

## ❌ Normal Response
> The capital of Australia is Canberra. While many people think it is Sydney or Melbourne due to their size and economic prominence, Canberra was actually chosen as a compromise between the two rival cities in 1908. It is a planned city, located in the Australian Capital Territory.
> 
> I hope this helps! Let me know if you want to know more about Australia's history.

* **Tokens used**: ~74 tokens.

---

##  Optimized TokenGuardian Response
> Canberra.

* **Tokens used**: 2 tokens.

---

## 📊 Token Savings Analysis

* **Normal Response Tokens**: 74
* **TokenGuardian Response Tokens**: 2
* **Total Tokens Saved**: 72 tokens
* **Output Token Reduction**: **97.3%**
* **Why it saved tokens**: Removed conversational fillers, unsolicited geographical trivia, and closing polite boilerplate.
