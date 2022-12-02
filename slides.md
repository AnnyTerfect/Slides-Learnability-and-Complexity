---
# try also 'default' to start simple
theme: default
# apply any windi css classes to the current slide
class: ['text-2xl']
colorSchema: 'light'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: false
# some information about the slides, markdown enabled
info: |
  Monotone Learning
# persist drawings in exports and build
drawings:
  persist: false
# use UnoCSS (experimental)
css: unocss
---

# Learnability and Complexity

Presented By Qin-Cheng Zheng

<img src="/images/lamda.png" />

<style>
  img {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 200px;
  }
</style>

---
class: 'text-2xl'
---

# Outline

- Statistical learnability
  - Game value
  - Complexity
- Online learnability
  - Game value
  - Complexity
- OL is hard than SL

---
class: 'text-2xl'
---

# Statistical Learning

- Dataset and distribution: <IE>D \sim \mathcal{D}^{n}</IE>
- Hypothesis space and concept class: <IE>\mathcal{H} \textrm{ and } \mathcal{C}</IE>
- Loss function and expected loss: <IE>\ell \textrm{ and } L(h) = \mathbb{E}_{x, y} [\ell(h(x), y)]</IE>
- Algorithm:
<E>\mathcal{A}: \bigcup_{n = 1}^{\infty} (\mathcal{X} \times \mathcal{Y})^{n} \rightarrow \mathcal{H}</E>

- Proper learnability:
<E>\mathbb{E}_{D} \big[ L(\mathcal{A}(D)) \big] - \inf_{ h \in \mathcal{H} } L(h) \rightarrow 0, \forall \mathcal{D}</E>

<div v-click class="mt-8 text-center text-3xl text-red-5">
  When is <IE>\mathcal{H}</IE> learnable?
</div>

---
class: 'text-2xl'
---

# A Game View

- Learner chooses the best algorithm <IE>\mathcal{A}</IE>, minimizing the loss
- Adversary chooses the worst distribution <IE>\mathcal{D}</IE>, maximizing the loss
- Game value:
<E>\mathcal{V}^{ \textrm{iid} } (\mathcal{H}, n) = \begin{aligned} \inf_{ \mathcal{A} } \\ \sup_{ \mathcal{D} } \end{aligned} \mathbb{E}_{D} \big[ L(\mathcal{A}(D)) \big] - \inf_{ h \in \mathcal{H} } L(h) \rightarrow 0</E>

<div v-click class="mt-3 text-center text-red-5">
  <IE>\inf_{ \mathcal{A} } \sup_{ \mathcal{D} }</IE> or <IE>\sup_{ \mathcal{D} } \inf_{ \mathcal{A} }</IE>?
</div>

<div v-click class="mt-3 text-center text-red-5">
  Learner plays first or adversary plays first?
</div>


<div v-click class="mt-3 text-center text-red-5">
  Do <IE>\mathcal{V}^{ \textrm{iid} } \rightarrow 0</IE> means that <IE>\mathcal{A}</IE> is a free lunch?
</div>

---
class: 'text-xl'
---

# No Free Lunch Theorem

<Theorem name="No Free Lunch">
  Suppose <IE>|\mathcal{X}| \geq 2n</IE>, <IE>\mathcal{Y} = \{ -1, +1 \}</IE>, and <IE>\ell</IE> is the <IE>0-1</IE> loss. We have <IE>\mathcal{V}^{ \textrm{iid} }(\mathcal{Y}^{ \mathcal{X} }, n) \geq 1/4</IE>.
</Theorem>

<Proof class="mt-2" type="Proof (Sketch)" v-click>
  <E>
    \begin{aligned}
      \mathcal{V}^{ \textrm{iid} }(\mathcal{H}, n)  &= \inf_{ \mathcal{A} } \sup_{ \mathcal{D} } \Big (
        \mathbb{E}{L(\mathcal{A}(D))} - \inf_{ h \in \mathcal{H} } L(h)
      \Big) \\
                                                    &\geq \inf_{ \mathcal{A} } \sup_{ \mathcal{D}^{\prime} = \{ \mathcal{D} \mid \inf_{ h \in \mathcal{H} } L(h) = 0 \} } \Big (
        \mathbb{E}{L(\mathcal{A}(D))}
                                                      \Big) \\
                                                    &\geq \inf_{ \mathcal{A} } \mathbb{E}_{ h \sim \mathcal{Q} } [L(h)] \\
                                                    &\geq \dots
    \end{aligned}
  </E>
</Proof>

<v-clicks class="mt-5">

- There is no hope to learn a class that is too expressive
- The more complex <IE>\mathcal{H}</IE> is, the harder the learning task
  - Does it make sense?

</v-clicks>


---
class: 'text-xl'
---

# Symmertrization

<Theorem>
  The value of the statistical learning game can be bounded as
  <div class="mt-3">
    <E>
      \begin{aligned}
          \mathcal{V}^{ \textrm{iid} }(\mathcal{H}, n) \leq 2 \mathcal{R}_{n}^{ \textrm{iid} }(\ell(\mathcal{H})) \ .
      \end{aligned}
    </E>
  </div>
</Theorem>

<Proof type="Proof (Sketch)">
  <E>
    \begin{aligned}
            &\ \mathcal{V}^{ \textrm{iid} }(\mathcal{H}, n) \\
      =     &\ \inf_{ \mathcal{A} } \sup_{ \mathcal{D} } \left[
        \mathbb{E} [L(h)] - \inf_{ h \in \mathcal{H} } L(h)
      \right] \\
      \leq  &\ \sup_{ \mathcal{D} } \left(
        \mathbb{E} \left[
          \sup_{ h \in \mathcal{H} } \left(
            L(h) - \frac{1}{n} \sum_{t = 1}^{n} \ell(h, z_{t})
          \right)
        \right]
      \right) &\textrm{(ERM)} \\
      \leq  &\ \frac{2}{n} \mathbb{E}_{ \boldsymbol{z}, \boldsymbol{\epsilon} } \left[
        \sup_{ h \in \mathcal{H} } \sum_{t = 1}^{n} \epsilon_{t} \ell(h, z_{t})
      \right] &\textrm{(symmertrization)} \\
      =     &\ 2\mathcal{R}_{n}^{ \textrm{iid} }(\ell(\mathcal{H}))
    \end{aligned}
  </E>
</Proof>

---
class: 'text-xl'
---

# Bounding the Rademacher

<div class="my-3">
  For classification tasks
</div>

<Theorem name="VC dimension">
  For any class <IE>\mathcal{H} \subset \{-1,+1\}^{ \mathcal{X} } </IE> and <IE>n</IE>, we have
  <E class="my-2">
    \mathcal{R}^{ \textrm{iid} }(\mathcal{H}, n) \leq \sqrt{
      \frac{
        2 \ln \Pi_{ \mathcal{H} }(n)
      } {n}
    } \leq \sqrt{
      \frac{2d \ln (\frac{en}{d})}{n}
    } 
  </E>
</Theorem>

<div class="my-3">
  For regression tasks
</div>

<Theorem name="Covering number">
  For any class <IE>\mathcal{H} \subset [-1,+1]^{ \mathcal{X} } </IE> and <IE>n</IE>, we have
  <E class="my-2">
    \mathcal{R}^{ \textrm{iid} }(\mathcal{H}, n) \leq \inf_{\alpha \geq 0} \left(
      \alpha + \sqrt{
        \frac{
          2 \ln \mathcal{N} (\mathcal{H}, \alpha)
        } {n}
      }
    \right)
  </E>
</Theorem>


---
class: 'text-xl'
---

# From SL to OL

- <IE>(x_t, y_1), \dots, (x_n, y_n)</IE> from i.i.d. to <i style="font-family: 'Times New Roman', Times, serif">adversarial</i>
- Learner chooses <IE>h_{t} \in \mathcal{H}</IE>, and adversary chooses <IE>z_{t} = (x_{t}, y_{t}), t = 1, \dots, n</IE>
- Algorithm: <IE>\mathcal{A}(\boldsymbol{z}\_{1: t-1}; h_{1:t-1}) = h_{t}</IE>
- Performance measure:
<E>
  \textrm{Reg}(\mathcal{A}, \boldsymbol{z}; \mathcal{H}, n) = \sum_{t = 1}^{n} \ell(h_{t}, z_t) - \inf_{ h \in \mathcal{H} } \sum_{t = 1}^{n} \ell(h, z_t)
</E>

- Oblivious v.s. adaptive adversary
  - Oblivious: <IE>\mathcal{V}^{ \textrm{seq} } (\mathcal{H}, n) = \inf_{ \mathcal{A} } \sup_{ \boldsymbol{z} } \frac{ \textrm{Reg} }{n}</IE>
  - Adaptive: <IE>\mathcal{V}^{ \textrm{seq} } (\mathcal{H}, n) = \Big\langle \inf_{ h_{t} } \sup_{ z_{t} } \Big\rangle_{t = 1}^{n} \frac{ \textrm{Reg} }{n}</IE>
- Target
<E>\underset{n \rightarrow \infty}{\lim\sup} \mathcal{ \mathcal{V}^{ \textrm{seq} } } = 0</E>

---
class: 'text-xl'
---

# Dual Game for Online Learning

<v-clicks>

<div>

- A pure strategy can be fragile, but a mixed strategy can be meaningful
<E>
  \mathcal{V}^{ \textrm{seq} } (\mathcal{H}, n) = \Big\langle \inf_{ \mathcal{Q}_{t} } \sup_{ z_{t} } \mathbb{E}_{ h_{t} \sim \mathcal{Q}_{t} } \Big\rangle_{t = 1}^{n} \frac{ \textrm{Reg} }{n}
</E>

</div>

<div>

- By adding redundant randomness
<E>
  \Big\langle \inf_{ \mathcal{Q}_{t} } \sup_{ z_{t} } \mathbb{E}_{ h_{t} \sim \mathcal{Q}_{t} } \Big\rangle_{t = 1}^{n} \frac{ \textrm{Reg} }{n} = \Big\langle \inf_{ \mathcal{Q}_{t} } \sup_{ \mathcal{P}_{t} } \mathbb{E}_{ h_{t} \sim \mathcal{Q}_{t}, z_{t} \sim \mathcal{P}_{t} } \Big\rangle_{t = 1}^{n} \frac{ \textrm{Reg} }{n}
</E>

</div>

<div>

- By the <i style="font-family: 'Times New Roman', Times, serif">minimax theorem</i>
<E>
  \Big\langle \inf_{ \mathcal{Q}_{t} } \sup_{ \mathcal{P}_{t} } \mathbb{E}_{ h_{t} \sim \mathcal{Q}_{t}, z_{t} \sim \mathcal{P}_{t} } \Big\rangle_{t = 1}^{n} \frac{ \textrm{Reg} }{n} = \Big\langle \sup_{ \mathcal{P}_{t} } \inf_{ \mathcal{Q}_{t} } \mathbb{E}_{ h_{t} \sim \mathcal{Q}_{t}, z_{t} \sim \mathcal{P}_{t} } \Big\rangle_{t = 1}^{n} \frac{ \textrm{Reg} }{n}
</E>

</div>

<div>

- By removing redundant randomness
<E>
  \Big\langle \sup_{ \mathcal{P}_{t} } \inf_{ \mathcal{Q}_{t} } \mathbb{E}_{ h_{t} \sim \mathcal{Q}_{t}, z_{t} \sim \mathcal{P}_{t} } \Big\rangle_{t = 1}^{n} \frac{ \textrm{Reg} }{n} = \Big\langle \sup_{ \mathcal{P}_{t} } \inf_{ h_{t} } \mathbb{E}_{ z_{t} \sim \mathcal{P}_{t} } \Big\rangle_{t = 1}^{n} \frac{ \textrm{Reg} }{n}
</E>

</div>

<div class="mt-4 text-center text-2xl text-red-5">
  <IE>\inf</IE> and <IE>\sup</IE> are swapped, so as to the randomness.
</div>


</v-clicks>

---
class: 'text-xl'
---

# Upper Bounding the Game Value

<Theorem>
  The value of the dual online game is bounded as
  <E>
    \begin{aligned}
        \mathcal{V}^{ \textrm{seq} }(\mathcal{H}, n)
      &= \Big\langle \sup_{ \mathcal{P}_{t} } \inf_{ h_{t} } \mathbb{E}_{ z_{t} \sim \mathcal{P}_{t} } \Big\rangle_{t = 1}^{n} \frac{ \textrm{Reg} }{n} \\
      &\leq \sup_{ \mathcal{P} } \mathbb{E}_{ \boldsymbol{z}_{1:n} \sim \mathcal{P} } \left[
              \sup_{ h \in \mathcal{H} } \frac{1}{n} \sum_{t = 1}^{n} \big(
                \mathbb{E}_{ z_{t}^{\prime} \sim \mathcal{P} (\cdot \mid \boldsymbol{z}_{1: t - 1}) } [\ell(h, z_{t}^{\prime})] - \ell(h, z_{t})
              \big)
            \right] \ .
    \end{aligned}
  </E>
</Theorem>

<div v-click>

  Comparing with the value in statistical learning

  <Theorem>
    The value of the statistical learning game can be bounded as
    <div class="mt-3">
      <E>
        \begin{aligned}
            \mathcal{V}^{ \textrm{iid} }(\mathcal{H}, n)
          &= \inf_{ \mathcal{A} } \sup_{ \mathcal{D} } \left[
          \mathbb{E} [L(h)] - \inf_{ h \in \mathcal{H} } L(h)
          \right] \\
          &\leq \sup_{ \mathcal{D} } \left(
            \mathbb{E}_{ \boldsymbol{z}_{1: n} \sim \mathcal{D}^{n} } \left[
              \sup_{ h \in \mathcal{H} } \frac{1}{n} \sum_{t = 1}^{n} \left(
                \mathbb{E}_{ z_{t}^{\prime} \sim \mathcal{D} } [\ell(h, z_{t}^{\prime})] - \ell(h, z_{t})
              \right)
            \right]
          \right) \ .
        \end{aligned}
      </E>
    </div>
  </Theorem>
</div>

<div v-click class="mt-3 text-center text-red-5">
  Joint distribution vs product distribution
</div>

---
class: 'text-lg'
---

# Sequential Rademacher Complexity

<div class="columns-2"> 
  <div class="pa-2 border-1">
    Rademacher in SL
    <div class="mt-2">
      <E>
        \mathcal{R}^{ \textrm{iid} }(\mathcal{H}) = \frac{1}{n} { \color{red}
          \mathbb{E}_{ \boldsymbol{x}_{1: n} } 
        } \mathbb{E}_{ \boldsymbol{\epsilon} } \left[
          \sup_{ h \in \mathcal{H} } \sum_{t = 1}^{n} \epsilon_{t} h({ \color{red}
            x_{t}
          })
        \right]
      </E>
    </div>
  </div>
  <div class="pa-2 border-1">
    Rademacher in OL
    <div class="mt-2">
      <E>
        \mathcal{R}^{ \textrm{seq} }(\mathcal{H}) = \frac{1}{n} { \color{red}
          \sup_{ \boldsymbol{x} }
        } \mathbb{E}_{ \boldsymbol{\epsilon} } \left[
          \sup_{ h \in \mathcal{H} } \sum_{t = 1}^{n} \epsilon_{t} h({ \color{red}
            x_{t}(\boldsymbol\epsilon)
          })
        \right]
      </E>
    </div>
  </div>
</div>

<div v-click class="flex" style="justify-content: center; align-items: stretch">
  <div style="width: 30%;" class="pa-4 text-sm">
    Cannot shatter any point pair
    <E class="mt-5">h(x_{1}) = +1 \wedge h(x_{2}) = -1</E>
    <E class="mt-5">h(x_{1}) = -1 \wedge h(x_{3}) = +1</E>
    <E class="mt-5">h(x_{2}) = -1 \wedge h(x_{3}) = +1</E>
  </div>

<div style="width: 40%" class="text-sm">

|  <IE>x_{1}</IE>   | <IE>x_{2}</IE> | <IE>x_{3}</IE> |
|  ----  | ----  | ---- |
| <IE>+1</IE>  | <IE>+1</IE> | <IE>+1</IE> |
| <IE>+1</IE>  | <IE>+1</IE> | <IE>-1</IE> |
| <IE>-1</IE>  | <IE>+1</IE> | <IE>-1</IE> |
| <IE>-1</IE>  | <IE>-1</IE> | <IE>-1</IE> |

</div>

<div style="width: 30%;" class="pa-3 text-center">
  <svg viewBox="0 0 200 180" class="border-1">
    <circle cx="100" cy="20" r="10" fill="none" stroke="black"></circle>
    <SVGE x="94" y="17" font-size="5">x_{1}</SVGE>
    <circle cx="60" cy="80" r="10" fill="none" stroke="black"></circle>
    <SVGE x="54" y="77" font-size="5">x_{2}</SVGE>
    <circle cx="140" cy="80" r="10" fill="none" stroke="black"></circle>
    <SVGE x="134" y="77" font-size="5">x_{3}</SVGE>
    <circle cx="35" cy="160" r="10" fill="none" stroke="black"></circle>
    <circle cx="85" cy="160" r="10" fill="none" stroke="black"></circle>
    <circle cx="115" cy="160" r="10" fill="none" stroke="black"></circle>
    <circle cx="165" cy="160" r="10" fill="none" stroke="black"></circle>
    <line x1="100" y1="30" x2="60" y2="70" stroke="black" />
    <line x1="100" y1="30" x2="140" y2="70" stroke="black" />
    <line x1="60" y1="90" x2="35" y2="150" stroke="black" />
    <line x1="60" y1="90" x2="85" y2="150" stroke="black" />
    <line x1="140" y1="90" x2="115" y2="150" stroke="black" />
    <line x1="140" y1="90" x2="165" y2="150" stroke="black" />
  </svg>
</div>

</div>

<E v-click class="text-2xl mt-5 text-red-5">
  \mathcal{R}^{ \textrm{iid} } \leq \mathcal{R}^{ \textrm{seq} }
</E>

---
class: 'text-lg'
---

# Sequential Rademacher Complexity

<div class="mt-2">
  Similarly, the game value <IE>\mathcal{V}^{ \textrm{seq} }</IE> can be bounded by <IE>\mathcal{R}^{ \textrm{seq} }</IE>
</div>

<Theorem class="mt-3">
  For any joint distribution <IE>\mathcal{P}</IE> and any class <IE>\mathcal{H}</IE>, we have 
  <E class="my-3">
      \mathcal{V}^{ \textrm{seq} }(\mathcal{H}, n)
    \leq \sup_{ \mathcal{P} } \mathbb{E}_{ \boldsymbol{z}_{1:n} \sim \mathcal{P} } \left[
      \sup_{ h \in \mathcal{H} } \frac{1}{n} \sum_{t = 1}^{n} \big(
        \mathbb{E}_{ z_{t}^{\prime} \sim \mathcal{P} (\cdot \mid \boldsymbol{z}_{1: t - 1}) } [\ell(h, z_{t}^{\prime})] - \ell(h, z_{t})
      \big)
    \right]
    \leq 2 \mathcal{R}^{ \textrm{seq} } (\ell(\mathcal{H}), n) \ .
  </E>  
</Theorem>

Comparing with the bound in SL

<Theorem class="mt-3">
  For any distribution <IE>\mathcal{D}</IE> and any class <IE>\mathcal{H}</IE>, we have 
  <E class="my-3">
      \mathcal{V}^{ \textrm{iid} }(\mathcal{H}, n)
    \leq \mathbb{E} \left[
      \sup_{ h \in \mathcal{H} } \left(
        L(h) - \frac{1}{n} \sum_{t = 1}^{n} \ell(h, z_{t})
      \right)
    \right]
    \leq 2 \mathcal{R}^{ \textrm{iid} } (\ell(\mathcal{H}), n) \ .
  </E>  
</Theorem>

<div v-click class="mt-5 text-center text-2xl text-red-5">
  The two bounds coincide perfectly!
</div>

---
class: 'text-lg'
---

# Littlestone Dimension

<div class="mt-3">
  Littlestone dimension measures the maximal mistakes the best algorithm may make in classificion.
</div>

<div class="columns-2">
  <svg viewBox="0 0 220 200" class="border-1">
    <g transform="translate(10, 0)">
      <circle cx="100" cy="20" r="10" fill="none" stroke="black"></circle>
      <SVGE x="94" y="17" font-size="5">x_{1}</SVGE>
      <circle cx="60" cy="80" r="10" fill="none" stroke="black"></circle>
      <SVGE x="54" y="77" font-size="5">x_{2}</SVGE>
      <circle cx="140" cy="80" r="10" fill="none" stroke="black"></circle>
      <SVGE x="134" y="77" font-size="5">x_{3}</SVGE>
      <circle cx="35" cy="160" r="10" fill="none" stroke="black"></circle>
      <SVGE x="29" y="157" font-size="5">x_{4}</SVGE>
      <circle cx="85" cy="160" r="10" fill="none" stroke="black"></circle>
      <SVGE x="79" y="156" font-size="5">x_{5}</SVGE>
      <circle cx="115" cy="160" r="10" fill="none" stroke="black"></circle>
      <SVGE x="109" y="156" font-size="5">x_{6}</SVGE>
      <circle cx="165" cy="160" r="10" fill="none" stroke="black"></circle>
      <SVGE x="159" y="156" font-size="5">x_{7}</SVGE>
      <line x1="100" y1="30" x2="60" y2="70" stroke="black" />
      <line x1="100" y1="30" x2="140" y2="70" stroke="red" />
      <line x1="60" y1="90" x2="35" y2="150" stroke="black" />
      <line x1="60" y1="90" x2="85" y2="150" stroke="black" />
      <line x1="140" y1="90" x2="115" y2="150" stroke="red" />
      <line x1="140" y1="90" x2="165" y2="150" stroke="black" />
      <line x1="35" y1="170" x2="25" y2="190" stroke="black" />
      <line x1="35" y1="170" x2="45" y2="190" stroke="black" />
      <line x1="85" y1="170" x2="75" y2="190" stroke="black" />
      <line x1="85" y1="170" x2="95" y2="190" stroke="black" />
      <line x1="115" y1="170" x2="105" y2="190" stroke="black" />
      <line x1="115" y1="170" x2="130" y2="190" stroke="red" />
      <line x1="165" y1="170" x2="155" y2="190" stroke="black" />
      <line x1="165" y1="170" x2="175" y2="190" stroke="black" />
      <SVGE x="120" y="37" font-size="5">+1</SVGE>
      <SVGE x="60" y="37" font-size="5">-1</SVGE>
      <SVGE x="160" y="100" font-size="5">+1</SVGE>
      <SVGE x="105" y="100" font-size="5">-1</SVGE>
      <SVGE x="75" y="100" font-size="5">+1</SVGE>
      <SVGE x="15" y="100" font-size="5">-1</SVGE>
      <SVGE x="15" y="180" font-size="5">-1</SVGE>
      <SVGE x="35" y="180" font-size="5">+1</SVGE>
      <SVGE x="65" y="180" font-size="5">-1</SVGE>
      <SVGE x="85" y="180" font-size="5">+1</SVGE>
      <SVGE x="100" y="180" font-size="5">-1</SVGE>
      <SVGE x="120" y="180" font-size="5">+1</SVGE>
      <SVGE x="145" y="180" font-size="5">-1</SVGE>
      <SVGE x="165" y="180" font-size="5">+1</SVGE>
    </g>
  </svg>
  <div>
    <Theorem type="Definition">
      Littlestone dimension of a function class <IE>\mathcal{H}</IE> is defined as
      <div class="mt-2">
        <E class="my-3">
            \textrm{Ldim}(\mathcal{H})
          \triangleq \underset{\mathcal{R}^{ \textrm{seq} } (\mathcal{H}, d) = 1}{\max d}  \ ,
        </E>
        where <IE>
          \mathcal{R}^{ \textrm{seq} }(\mathcal{H}) = \frac{1}{n} { \color{black}
            \sup_{ \boldsymbol{x} }
          } \mathbb{E}_{ \boldsymbol{\epsilon} } \left[
            \sup_{ h \in \mathcal{H} } \sum_{t = 1}^{n} \epsilon_{t} h({ \color{black}
              x_{t}(\boldsymbol\epsilon)
            })
          \right]
        </IE> .
      </div>
    </Theorem>
    <div class="mt-20 pa-2 border-1">
      For example, as shown in the figure, the learner can determine which the best hypothesis is after <IE>d</IE> attempts.
    </div>
  </div>
</div>

---
class: 'text-xl'
---

# Littlestone Dimension

<v-clicks>
  <div>
    <div class="my-2">
      Relation to VC dimension
    </div>
    <Theorem>
      For any class <IE>\mathcal{H}</IE>, we have 
      <IE class="my-2">\textrm{VC}(\mathcal{H}) \leq \textrm{Ldim}(\mathcal{H}) \ .</IE>
    </Theorem>
  </div>

  <div>
    <div class="my-2">
      Mistake bound
    </div>
    <Theorem>
      For any algorithm <IE>\mathcal{A}</IE> learning any class <IE>\mathcal{H}</IE>, the time of algorithm making mistake can be bounded by
      <IE class="my-2">M \geq \textrm{Ldim}(\mathcal{H}) \ .</IE>
    </Theorem>
  </div>

  <div>
    <div class="my-2">
      Impossible to learn
    </div>
    <Theorem>
      If <IE>\textrm{Ldim} = \infty</IE>, then any algorithm <IE>\mathcal{A}</IE> has a regret bound 
      <IE class="my-2">
        \textrm{Reg} = \Omega(T) \ .
      </IE>
    </Theorem>
  </div>

  <div>
    <div class="my-2">
      Tight regret bound
    </div>
    <Theorem name="Ben-David et al. [2009]">
      For any algorithm <IE>\mathcal{A}</IE> learning <IE>\mathcal{H}</IE> we have <IE>\textrm{Reg} = \Omega(\sqrt{ T \cdot \textrm{Ldim} }) \ .</IE> There exists an algorithm with <IE>\textrm{Reg} = \mathcal{O}(\sqrt{ T \cdot \textrm{Ldim} }) \ .</IE>
    </Theorem>
  </div>
</v-clicks>

---
class: 'text-xl'
---

# Littlestone Dimension

In statistical learning

<Theorem name="VC dimension">
  For any class <IE>\mathcal{H} \subset \{-1,+1\}^{ \mathcal{X} } </IE> and <IE>n</IE>, we have
  <E class="my-2">
    \mathcal{R}^{ \textrm{iid} }(\mathcal{H}, n) \leq \sqrt{
      \frac{
        2 \ln \Pi_{ \mathcal{H} }(n)
      } {n}
    } \leq \sqrt{
      \frac{2d \ln (\frac{en}{d})}{n}
    } 
  </E>
</Theorem>

Similarly, Littlestone dimension has properties like VC dimension.

<Theorem>
  For any class <IE>\mathcal{H} \subset \{-1,+1\}^{ \mathcal{X} }</IE> with <IE>d = \textrm{Ldim}(\mathcal{H})</IE>, we have
  <E class="my-3">
    \mathcal{R}^{ \textrm{seq} } (\mathcal{H}, n) \leq \sqrt{
      \frac{2d \ln (\frac{en}{d})}{n}
    }
  </E>
</Theorem>

<div v-click class="mt-5 text-center text-2xl text-red-5">
  The two bounds coincide perfectly!
</div>


---
class: 'text-2xl'
---

# Littlestone Dimension

<div class="my-5">
  Comparison of the error bound for classification in SL and OL
</div>

|     | Finite Hypothesis Space | Infinite Hypothesis Space |
|  ----  | ----  | ---- |
| SL (error)  | <IE>\mathcal{O}\left( \sqrt{ \frac{ \ln(\lvert \mathcal{H} \rvert) }{n}  } \right)</IE> | <IE>\Theta\left( \sqrt{ \frac{ \textrm{VC}(\mathcal{H}) }{n}  } \right)</IE> |
| OL (avg. regret)  | <IE>\mathcal{O}\left( \sqrt{ \frac{ \ln(\lvert \mathcal{H} \rvert) }{n}  } \right)</IE> | <IE>\Theta\left( \sqrt{ \frac{ \textrm{Ldim}(\mathcal{H}) }{n}  } \right)</IE> |

<div class="mt-5 text-center text-2xl text-red-5">
  Littlestone dimension can be regarded as an extension of VC dimension.
</div>

---
class: 'text-2xl'
---

# OL is No Easier than SL

<Theorem class="mt-5">
  For any <IE>\mathcal{H}</IE> and <IE>n</IE>, we have <IE>\mathcal{V}^{ \textrm{iid} } (\mathcal{H}, n) \leq \mathcal{V}^{ \textrm{seq} }(\mathcal{H}, n)</IE>.
</Theorem>

<v-clicks class="mt-5">

- Given the same hypothesis space <IE>\mathcal{H}</IE>, online learnabilty implies statistical learnabilty, but not vice versa.
- Adversarial <IE>\boldsymbol{z}</IE> can be treated as an extension of <IE>\boldsymbol{z} \sim \mathcal{D}^{n}</IE> (a.k.a. i.i.d.), which is intuitively more difficult.
- OGD learns <IE>\mathcal{H}_{ \textrm{conv} } = \\{ h \mid h \textrm{ is convex } \\}</IE> in the online setting, implying that <IE>\mathcal{H}</IE> is statistically learnable.

</v-clicks>

<div v-click class="mt-4 text-3xl text-center text-red-5">
  Is OL strictly harder than SL?
</div>

---
class: 'text-2xl'
---

# Online-to-batch conversion

<Theorem class="mt-5" type="Definition">
Given an online algorithm <IE>\mathcal{A}^{o}</IE>, online-to-batch conversion <IE>\mathfrak{B}</IE> converts <IE>\mathcal{A}^{o}</IE> to a statistical learning algorithm <IE>\mathcal{A}^{s} = \mathfrak{B}(\mathcal{A}^{o})</IE>.
</Theorem>

<svg class="mt-5 border-1" viewBox="0 0 600 200">
  <defs>
    <marker id="arrow" markerWidth="6" markerHeight="4" markerUnits="stroke-width" orient="auto" refY="2">
      <path d="M0 0 L6,2 L0,4 Z" />
    </marker>
    <g id="alg_ol">
      <rect
        width="120"
        height="100"
        fill="none"
        stroke="black"
      ></rect>
      <g font-size="20" transform="translate(-10, -10)">
        <SVGE x="60" y="50" transform="translate(-10, -10)">
          \mathcal{A}^{o}
        </SVGE>
      </g>
    </g>
  </defs>
  <g v-click id="online" transform="translate(10, 50)">
    <SVGE y="47" font-size="10">z</SVGE>
    <line x1="20" y1="50" x2="40" y2="50" marker-end="url(#arrow)" stroke="black" />
    <use x="60" xlink:href="#alg_ol" />
    <SVGE x="230" y="45" font-size="10">h</SVGE>
    <line x1="190" y1="50" x2="210" y2="50" marker-end="url(#arrow)" stroke="black" />
  </g>
  <g v-click id="stats" transform="translate(280, 20)">
    <SVGE y="17" font-size="10">z_{1}</SVGE>
    <SVGE y="57" font-size="10">z_{2}</SVGE>
    <SVGE y="97" font-size="10">z_{3}</SVGE>
    <SVGE y="137" font-size="10">z_{4}</SVGE>
    <line x1="20" y1="20" x2="50" y2="65" marker-end="url(#arrow)" stroke="black" />
    <line x1="20" y1="60" x2="50" y2="75" marker-end="url(#arrow)" stroke="black" />
    <line x1="20" y1="100" x2="50" y2="85" marker-end="url(#arrow)" stroke="black" />
    <line x1="20" y1="140" x2="50" y2="95" marker-end="url(#arrow)" stroke="black" />
    <rect
      x="60"
      width="200"
      height="160"
      fill="none"
      stroke="black"
    ></rect>
    <g font-size="20" transform="translate(-10, -10)">
      <SVGE x="140" y="80" transform="translate(-10, -10)">
        \mathcal{A}^{s}
      </SVGE>
    </g>
    <SVGE x="80" y="16" font-size="10">z_{1}</SVGE>
    <line x1="100" y1="20" x2="115" y2="20" marker-end="url(#arrow)" stroke="black" />
    <use xlink:href="#alg_ol" transform="translate(125, 7) scale(0.25)" />
    <line x1="160" y1="20" x2="175" y2="20" marker-end="url(#arrow)" stroke="black" />
    <SVGE x="190" y="16" font-size="10">h_{1}</SVGE>
    <SVGE x="80" y="46" font-size="10">z_{2}</SVGE>
    <line x1="100" y1="50" x2="115" y2="50" marker-end="url(#arrow)" stroke="black" />
    <use xlink:href="#alg_ol" transform="translate(125, 37) scale(0.25)" />
    <line x1="160" y1="50" x2="175" y2="50" marker-end="url(#arrow)" stroke="black" />
    <SVGE x="190" y="46" font-size="10">h_{2}</SVGE>
    <SVGE x="80" y="106" font-size="10">z_{3}</SVGE>
    <line x1="100" y1="110" x2="115" y2="110" marker-end="url(#arrow)" stroke="black" />
    <use xlink:href="#alg_ol" transform="translate(125, 97) scale(0.25)" />
    <line x1="160" y1="110" x2="175" y2="110" marker-end="url(#arrow)" stroke="black" />
    <SVGE x="190" y="106" font-size="10">h_{3}</SVGE>
    <SVGE x="80" y="136" font-size="10">z_{4}</SVGE>
    <line x1="100" y1="140" x2="115" y2="140" marker-end="url(#arrow)" stroke="black" />
    <use xlink:href="#alg_ol" transform="translate(125, 127) scale(0.25)" />
    <line x1="160" y1="140" x2="175" y2="140" marker-end="url(#arrow)" stroke="black" />
    <SVGE x="190" y="136" font-size="10">h_{4}</SVGE>
    <line x1="210" y1="20" x2="220" y2="60" marker-end="url(#arrow)" stroke="black" />
    <line x1="210" y1="50" x2="220" y2="70" marker-end="url(#arrow)" stroke="black" />
    <line x1="210" y1="110" x2="220" y2="90" marker-end="url(#arrow)" stroke="black" />
    <line x1="210" y1="140" x2="220" y2="100" marker-end="url(#arrow)" stroke="black" />
    <g font-size="15" transform="translate(235, 20) rotate(90)">
      <text>
        randomly choose
      </text>
    </g>
    <line x1="270" y1="80" x2="285" y2="80" marker-end="url(#arrow)" stroke="black" />
    <SVGE x="295" y="75" font-size="10">h</SVGE>
  </g>
</svg>

---
class: 'text-xl'
---

# Proof

<Theorem class="mt-5">
  For any <IE>\mathcal{H}</IE> and <IE>n</IE>, we have <IE>\mathcal{V}^{ \textrm{iid} } (\mathcal{H}, n) \leq \mathcal{V}^{ \textrm{seq} }(\mathcal{H}, n)</IE>.
</Theorem>


<Proof class="mt-2 leading-normal" type="Proof (Sketch)">
  By applying online-to-batch conversion
  <E>
    \begin{aligned}
        \mathbb{E}[L(h)] - L(h^{\star})
      &= \frac{1}{n} \sum_{t = 1}^{n} \mathbb{E} [L(h_{t})] - \frac{1}{n} \sum_{t = 1}^{n} L(h^{\star}) \\
      &= \mathbb{E} \left[
        \frac{1}{n} \sum_{t = 1}^{n} \ell(h_{t}, z_{t}) - \frac{1}{n} \sum_{t = 1}^{n} \ell(h^{\star}, z_{t})
      \right] \\
      &\leq \mathbb{E} \left[
        \frac{1}{n} \sum_{t = 1}^{n} \ell(h_{t}, z_{t}) - \inf_{ h \in \mathcal{H} } \frac{1}{n}\sum_{t = 1}^{n} \ell(h, z_{t})
      \right] \ ,
    \end{aligned} 
  </E>
  where <IE>h^{\star} \in \underset{ h \in \mathcal{H} }{\arg\min} L(h)</IE>. Define <IE>\mathcal{R}(\mathcal{A}, \mathcal{D}) \triangleq \mathbb{E}[L(h)] - L(h^{\star})</IE>, then we have:
  <div class="mt-2">
    <E>
      \inf_{ \mathcal{A} } \sup_{ \mathcal{D} } \mathcal{R}(\mathcal{A}, \mathcal{D}) \leq \sup_{ \mathcal{D} } \mathcal{R}(\mathfrak{B}(\mathcal{A}^{o \star}), \mathcal{D}) \leq \sup_{ \mathcal{D} } \mathcal{R}(\mathcal{A}^{o\star}, \mathcal{D}) = \inf_{ \mathcal{A} } \sup_{ \mathcal{D} } \mathcal{R}(\mathcal{A}, \mathcal{D}) \ .
    </E>
  </div>
</Proof>

---
class: 'text-xl'
---

# OL is Strictly Harder than SL

<div class="pt-2 columns-2">
  <svg viewBox="0 0 220 200" class="border-1">
    <g transform="translate(10, 0)">
      <circle cx="100" cy="20" r="10" fill="none" stroke="black"></circle>
      <g transform="translate(94, 17) scale(0.6)"><SVGE font-size="5">1/2</SVGE></g>
      <circle cx="60" cy="80" r="10" fill="none" stroke="black"></circle>
      <g transform="translate(54, 77) scale(0.6)"><SVGE font-size="5">1/4</SVGE></g>
      <circle cx="140" cy="80" r="10" fill="none" stroke="black"></circle>
      <g transform="translate(134, 77) scale(0.6)"><SVGE font-size="5">3/4</SVGE></g>
      <circle cx="35" cy="160" r="10" fill="none" stroke="black"></circle>
      <g transform="translate(29, 157) scale(0.6)"><SVGE font-size="5">1/8</SVGE></g>
      <circle cx="85" cy="160" r="10" fill="none" stroke="black"></circle>
      <g transform="translate(79, 156) scale(0.6)"><SVGE font-size="5">3/8</SVGE></g>
      <circle cx="115" cy="160" r="10" fill="none" stroke="black"></circle>
      <g transform="translate(109, 156) scale(0.6)"><SVGE font-size="5">5/8</SVGE></g>
      <circle cx="165" cy="160" r="10" fill="none" stroke="black"></circle>
      <g transform="translate(159, 156) scale(0.6)"><SVGE font-size="5">7/8</SVGE></g>
      <line x1="100" y1="30" x2="60" y2="70" stroke="black" />
      <line x1="100" y1="30" x2="140" y2="70" stroke="red" />
      <line x1="60" y1="90" x2="35" y2="150" stroke="black" />
      <line x1="60" y1="90" x2="85" y2="150" stroke="black" />
      <line x1="140" y1="90" x2="115" y2="150" stroke="red" />
      <line x1="140" y1="90" x2="165" y2="150" stroke="black" />
      <line x1="35" y1="170" x2="25" y2="190" stroke="black" />
      <line x1="35" y1="170" x2="45" y2="190" stroke="black" />
      <line x1="85" y1="170" x2="75" y2="190" stroke="black" />
      <line x1="85" y1="170" x2="95" y2="190" stroke="black" />
      <line x1="115" y1="170" x2="105" y2="190" stroke="black" />
      <line x1="115" y1="170" x2="130" y2="190" stroke="red" />
      <line x1="165" y1="170" x2="155" y2="190" stroke="black" />
      <line x1="165" y1="170" x2="175" y2="190" stroke="black" />
      <SVGE x="120" y="37" font-size="5">+1</SVGE>
      <SVGE x="60" y="37" font-size="5">-1</SVGE>
      <SVGE x="160" y="100" font-size="5">+1</SVGE>
      <SVGE x="105" y="100" font-size="5">-1</SVGE>
      <SVGE x="75" y="100" font-size="5">+1</SVGE>
      <SVGE x="15" y="100" font-size="5">-1</SVGE>
      <SVGE x="15" y="180" font-size="5">-1</SVGE>
      <SVGE x="35" y="180" font-size="5">+1</SVGE>
      <SVGE x="65" y="180" font-size="5">-1</SVGE>
      <SVGE x="85" y="180" font-size="5">+1</SVGE>
      <SVGE x="100" y="180" font-size="5">-1</SVGE>
      <SVGE x="120" y="180" font-size="5">+1</SVGE>
      <SVGE x="145" y="180" font-size="5">-1</SVGE>
      <SVGE x="165" y="180" font-size="5">+1</SVGE>
    </g>
  </svg>
  <div>
    <Theorem type="Fact">
      Littlestone dimension for threshold functions <IE>\mathcal{H} = \{h = \mathbb{I}(x \leq \theta) \}</IE>
      <E class="my-2">
        \textrm{Ldim}(\mathcal{H}) = \infty \ .
      </E>
    </Theorem>
    <Theorem class="my-4" type="Fact">
      VC dimension for threshold functions <IE>\mathcal{H} = \{h = \mathbb{I}(x \leq \theta) \}</IE>
      <E class="my-2">
        \textrm{VC}(\mathcal{H}) = 1 \ .
      </E>
    </Theorem>
    <div class="mt-10 text-2xl text-center text-red-5">
      Threshold functions can be statistically learned easily, but cannot be learned in the online setting.
    </div>
  </div>
</div>

---
class: 'text-2xl'
---

# Discussions

- <IE>\mathcal{R}^{ \textrm{seq} }(\mathcal{H}_{ \textrm{conv} }) &lt; \infty</IE>, <IE>\mathcal{R}^{ \textrm{seq} }(\mathcal{H}_{ \textrm{threshold} }) = \infty</IE>

  - Anything beyond convex functions?
- Relation to online logistic regression
- Stability of online algorithm

---
class: 'text-2xl'
---

# Summary

<v-clicks>

- Learnability
  - Game value
  - Symmertrization and Rademacher complexity
- Relation between statistical learnability and online learnabiliy
  - The error bounds coincide perfectly
  - Online learning is strictly harder

</v-clicks>

<v-clicks>

<div class="absolute right-20 bottom-20 text-red-6 text-5xl">
  Q&A
</div>

</v-clicks>
