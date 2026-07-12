# Research Summarization Example

This example demonstrates how TokenGuardian utilizes high-density Markdown tables to summarize technical research papers or concepts, cutting down prose token overhead.

---

## 🙋 User Prompt
> Compare HTTP/2 and HTTP/3 multiplexing mechanisms.

---

## ❌ Normal Response
> HTTP/2 and HTTP/3 both solve the head-of-line blocking problem present in HTTP/1.1, but they do so in different layers of the network stack.
> 
> In HTTP/2, multiplexing is implemented at the application layer over a single TCP connection. HTTP/2 introduces "streams," which are bidirectional sequences of frames. Multiple streams can share a single TCP connection, allowing requests and responses to be sent concurrently. However, because TCP is a byte-stream protocol that guarantees order, if a single packet is lost in transit, TCP halts all data transmission until that packet is retransmitted. This causes "TCP Head-of-Line (HoL) blocking," where all multiplexed HTTP/2 streams are blocked by one lost packet.
> 
> In HTTP/3, multiplexing is moved down to the transport layer using QUIC (which runs over UDP). QUIC natively understands streams. Each stream in QUIC is treated independently at the transport layer. Therefore, if a packet belonging to Stream A is lost, only Stream A is paused. Stream B, C, and D continue transmitting data. This completely eliminates TCP Head-of-Line blocking, making HTTP/3 significantly more robust over lossy wireless networks.
> 
> In summary, HTTP/2 multiplexes over a single TCP stream, meaning a single packet drop stalls all streams, whereas HTTP/3 uses QUIC over UDP to isolate streams, preventing cross-stream blocking.

* **Tokens used**: ~262 tokens.

---

##  Optimized TokenGuardian Response
| Feature | HTTP/2 Multiplexing | HTTP/3 Multiplexing |
| :--- | :--- | :--- |
| **Transport Protocol** | TCP (Connection-oriented) | QUIC over UDP (Connectionless transport) |
| **Multiplexing Layer** | Application layer (HTTP Streams) | Transport layer (QUIC Native Streams) |
| **Head-of-Line Blocking** | **Yes (TCP-level)**. One lost packet stalls all concurrent streams. | **No (Isolated streams)**. Lost packet only stalls its specific stream. |
| **Performance on Lossy Nets** | Degrades significantly during packet drops. | Remains high; unaffected streams continue immediately. |

* **Tokens used**: ~112 tokens.

---

## 📊 Token Savings Analysis

* **Normal Response Tokens**: 262
* **TokenGuardian Response Tokens**: 112
* **Total Tokens Saved**: 150 tokens
* **Output Token Reduction**: **57.3%**
* **Why it saved tokens**: Rewrote long-form comparison paragraphs into a highly structured comparison table. Tables reduce grammatical filler (conjunctions, transition words, introductory explanations) and increase readability.
