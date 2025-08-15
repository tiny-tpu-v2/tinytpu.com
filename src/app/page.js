import { Roboto_Mono } from "next/font/google";
import Image from "next/image";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

const verilogSnippet = `always_ff @(posedge clk or posedge rst) begin
        if (rst) begin
            input_out <= 0;
            psum_out <= 0;
            weight_reg <= 0;
        end else if (load_weight) begin
            weight_reg <= weight;
        end else if (start) begin
            input_out <= input_in;
            psum_out <= (input_in * weight_reg) + psum_in;
        end
    end`;

function highlightVerilog(code) {
  const escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .replace(
      /\b(always_ff|posedge|negedge|begin|end|if|else)\b/g,
      '<span class="text-purple-700">$1</span>'
    )
    .replace(
      /\b(clk|rst|input_out|psum_out|weight_reg|load_weight|weight|start|input_in|psum_in)\b/g,
      '<span class="text-blue-700">$1</span>'
    )
    .replace(/\b(0|1)\b/g, '<span class="text-rose-700">$1</span>')
    .replace(
      /(&lt;=|==|\+|\*|\(|\))/g,
      '<span class="text-gray-700">$1</span>'
    );
}

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden flex justify-center items-start px-4 sm:px-6 lg:px-8 pt-10 md:pt-28 pb-10 md:pb-14">
      <div className="w-full max-w-3xl text-base md:text-lg leading-7 md:leading-8 text-left break-words">
        <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight mb-3">
          Tiny-TPU: the why and how
        </h1>
        <div className="space-x-4">
          <p className="text-xs sm:text-sm text-neutral-600 mb-2 sm:mb-3 whitespace-normal break-words">
            Aug 17th 2025 ·
            <a
              href="https://x.com/XanderChin"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline hover:text-neutral-800 mr-1 ml-1"
            >
              Xander Chin,
            </a>
            <a
              href="https://x.com/kennykgguo"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline hover:text-neutral-800 mr-1"
            >
              Kenny Guo,
            </a>
            <a
              href="https://x.com/evanliin"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline hover:text-neutral-800 mr-1"
            >
              Evan Lin,
            </a>
            <a
              href="https://x.com/suryasure05"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline hover:text-neutral-800"
            >
              Surya Sure
            </a>
          </p>
          <div className="mt-6 mb-6 sm:mb-8 flex flex-wrap items-center gap-2">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded md:rounded-md text-xs font-medium bg-neutral-200 border border-neutral-400 text-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_1px_0_rgba(0,0,0,0.25)] hover:bg-neutral-300"
              aria-label="Project on GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-3 w-3"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.37-3.37-1.37-.45-1.17-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.64-1.37-2.22-.26-4.56-1.13-4.56-5.03 0-1.11.39-2.01 1.03-2.72-.1-.26-.45-1.31.1-2.74 0 0 .84-.27 2.75 1.03a9.16 9.16 0 0 1 5 0c1.9-1.3 2.74-1.03 2.74-1.03.55 1.43.2 2.48.1 2.74.64.71 1.03 1.62 1.03 2.72 0 3.91-2.34 4.77-4.57 5.03.36.32.69.94.69 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.05 10.05 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
              </svg>
              Github
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded md:rounded-md text-xs font-medium bg-neutral-200 border border-neutral-400 text-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_1px_0_rgba(0,0,0,0.25)] hover:bg-neutral-300"
              aria-label="Project on Twitter/X"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-3 w-3"
                fill="currentColor"
              >
                <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.564-2.005.974-3.127 1.195-.897-.959-2.178-1.559-3.594-1.559-2.723 0-4.932 2.21-4.932 4.932 0 .39.045.765.127 1.124-4.094-.205-7.725-2.167-10.159-5.144-.424.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.6 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.402 4.768 2.221 7.557 2.221 9.054 0 14-7.496 14-13.986 0-.209 0-.423-.015-.637.961-.695 1.8-1.562 2.46-2.549z" />
              </svg>
              Twitter
            </a>
            <a
              href="https://drive.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded md:rounded-md text-xs font-medium bg-neutral-200 border border-neutral-400 text-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_1px_0_rgba(0,0,0,0.25)] hover:bg-neutral-300"
              aria-label="Project on Google Drive"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-3 w-3"
                fill="currentColor"
              >
                <path d="M3 7a2 2 0 012-2h3l2 2h7a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
              </svg>
              Google Drive
            </a>
          </div>
        </div>
        <p>
          Nobody really understands how TPUs work…and neither do we! So we
          wanted to make this because we wanted to take a shot and try to guess
          how it works–from the perspective of complete novices!
        </p>
        <br />
        <div className="w-full aspect-square bg-white border border-neutral-300 rounded-lg flex items-center justify-center p-4">
          <div className="relative w-full h-full">
            <Image
              src="/longslideshow.svg"
              alt="Long slideshow diagram"
              fill
              className="object-contain p-4"
              priority
            />
          </div>
        </div>

        <div className="flex justify-start items-center gap-4 mt-4 mb-6">
          <button className="w-12 h-12 rounded-lg border border-neutral-300 bg-white shadow-sm hover:bg-neutral-50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6 text-neutral-600"
              fill="currentColor"
            >
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>

          <button className="w-12 h-12 rounded-lg border border-neutral-300 bg-white shadow-sm hover:bg-neutral-50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6 text-neutral-600"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          <button className="w-12 h-12 rounded-lg border border-neutral-300 bg-white shadow-sm hover:bg-neutral-50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6 text-neutral-600"
              fill="currentColor"
            >
              <path d="M6 6h12v12H6z" />
            </svg>
          </button>

          <button className="w-12 h-12 rounded-lg border border-neutral-300 bg-white shadow-sm hover:bg-neutral-50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6 text-neutral-600"
              fill="currentColor"
            >
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>

          <button
            className="px-3 py-2 h-12 rounded-lg border border-neutral-300 bg-white shadow-sm hover:bg-neutral-50 flex items-center justify-center text-xs font-medium text-neutral-600"
            title="Return back to where I last clicked from"
          >
            Return Back
          </button>
        </div>
        <h2 className="text-base md:text-lg font-semibold text-neutral-800 mb-1">
          Background
        </h2>
        <p>Why did we start this project?</p>
        <br />
        <p>
          We wanted to do something very challenging (maybe even olympic level)
          to prove to ourselves that we can do anything we put our mind to. The
          reasoning for why we chose to build a TPU specifically is fairly
          simple:
        </p>
        <ul className="list-disc list-inside text-left mt-4 break-words">
          <li>Building a chip for ML workloads seemed cool</li>
          <li>
            There was no well-documented open source repo for an ML accelerator
            that performed both inference and training
          </li>
        </ul>
        <br />
        <p>
          None of us have real professional experience in hardware design,
          which, in a way, made the TPU even more appealing since we weren’t
          able to estimate exactly how difficult it would be. As we worked on
          the initial stages of this project, we established a strict design
          philosophy: ALWAYS TRY THE HACKY WAY. This meant trying out the “dumb”
          ideas that came to our mind first BEFORE consulting external sources.
          This philosophy helped us make sure we weren’t reverse engineering the
          TPU, but rather re-inventing it, which helped us derive many of the
          key mechanisms used in the TPU ourselves.
        </p>
        <br />
        <p>
          We also wanted to treat this project as an exercise to code without
          relying on AI to write for us, since we felt that our initial instinct
          recently has been to reach for these AI tools whenever we faced a
          slight struggle. We wanted to cultivate a certain style of thinking
          that we could take forward with us and use in any future endeavours to
          think through difficult problems.
          <sup className="ml-1 text-[12px]">
            <a
              href="#fn1"
              className="no-underline text-purple-700 hover:text-purple-900"
            >
              [1]
            </a>
          </sup>
        </p>

        <div className="mt-10 md:mt-16 w-full">
          <pre
            className={`${robotoMono.className} border border-black rounded-md bg-white p-4 text-xs sm:text-sm md:text-base overflow-x-auto whitespace-pre md:whitespace-pre-wrap`}
          >
            <code
              dangerouslySetInnerHTML={{
                __html: highlightVerilog(verilogSnippet),
              }}
            />
          </pre>
        </div>

        <div className="mt-6 md:mt-8">
          <p>
            Throughout this project we tried to learn as much as we could about
            the fundamentals of deep learning, hardware design and creating
            algorithms. We found that the best way to learn about this stuff is
            by drawing everything out and making that our first instinct. As you
            read this post, you will see how our explanations were inspired by
            this philosophy.
          </p>
          <br />
          <p>
            Before we move forward, we want to make it clear what this article
            covers and what it doesn’t. Note that this is NOT A 1-to-1 replica
            of the TPU — it is our attempt at re-inventing the TPU ourselves.
          </p>
          <div className="mt-6 overflow-x-auto">
            <div className="relative mx-auto w-full max-w-xl h-48 md:h-64">
              <Image
                src="/PE.svg"
                alt="PE diagram"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <br />
        <h2 className="text-base md:text-lg font-semibold text-neutral-800 mb-1">
          What is a TPU?
        </h2>
        <div className="space-y-4 md:space-y-6">
          <p>
            A TPU is an application specific chip (ASIC) designed by Google to
            make inferencing and training ML models faster and more efficient.
            Whereas a GPU can be used to render frames AND run ML workloads, a
            TPU can only perform math operations, allowing it to be better at
            what it’s designed for. Naturally, trying to master a single task is
            much easier and will yield better results than trying to master
            multiple tasks and the TPU strongly employs this philosophy. We can
            use numbers to prove this: The best NVIDIA GPU that existed when the
            TPUv1 released was the NVIDIA GeForce GTX Titan X. This GPU had 3584
            CUDA cores, each of which could perform one fused multiply-add (the
            predominant operation in ML workloads) per clock cycle. To perform a
            matrix multiplication on two 256x256 matrices, it would take the
            Titan X 4682 clock cycles. It would take the TPUv1 511 clock cycles.
          </p>
          <p>
            Specifically, the TPU is very efficient at performing matrix
            multiplications, which make up 90-90% of the compute operations in
            transformers (up to 95% in very large models) and 70-80% in CNNs.
            Each matrix multiplication represents the calculation for a single
            layer in an MLP, and in deep learning, we have many of these layers,
            making TPUs increasingly efficient for larger models.
          </p>
          <h3 className="text-sm md:text-base font-semibold text-neutral-800">
            Systolic array and PEs
          </h3>
          <p>
            The heart of a TPU is a unit called the systolic array. It consists
            of individual building blocks called Processing Elements (PE) which
            are connected together in a grid-like structure. Each PE performs a
            multiply-accumulate operation, meaning it multiplies an incoming
            input X with a stationary weight W and adds it to an incoming
            accumulated sum, all in the same clock cycle.
          </p>
          <h3 className="text-sm md:text-base font-semibold text-neutral-800">
            Systolic matrix multiplication
          </h3>
          <p>
            When these PEs are connected together, they can be used to perform
            matrix multiplication systolically, meaning multiple elements of the
            output matrix can be calculated every clock cycle.
          </p>
          <p className="italic">[INSERT GIF OF SYSTOLIC ARRAY WITH SYMBOLS]</p>
          <p>
            Because of this single unit (and the fact that matrix
            multiplications dominate the computations performed in models), TPUs
            can very easily inference and train any model.
          </p>
        </div>
        <br />
        <h2 className="text-base md:text-lg font-semibold text-neutral-800 mb-1">
          How did we develop the TPU?
        </h2>
        <div className="space-y-4 md:space-y-6">
          <p>
            When we started this project, all we knew was that systolic arrays
            could be used for matrix multiplication and that the equation y = mx
            + b is the foundational building block for neural networks. However,
            we needed to fully UNDERSTAND the math behind neural networks to
            build other modules in our TPU. So before we started writing any
            code, each of us worked out the math of a simple 2 -&gt; 2 -&gt; 1
            multi-layer perceptron (MLP).
          </p>
          <p className="italic">[INSERT IMAGE OF WHITEBOARD MATH]</p>
          <h3 className="text-sm md:text-base font-semibold text-neutral-800">
            Why XOR?
          </h3>
          <p>
            The reason we chose this specific network is because we were
            targeting inference and training for the XOR problem (the
            &quot;hello world&quot; of neural networks). The XOR problem is one
            of the simplest problems a neural network can solve. All other gates
            (AND, OR, etc) can predict the outputs from its inputs using just
            one linear line (one neuron) to separate which inputs correspond to
            a 0 and which ones correspond to a 1. But to classify all XOR, an
            MLP is needed, since it requires curved decision boundaries, which
            can’t be achieved with ONLY linear equations.
          </p>
          <h3 className="text-sm md:text-base font-semibold text-neutral-800">
            Batching and dimensions
          </h3>
          <p>
            Now, say we want to do continuous inference (i.e. self driving car
            making multiple predictions a second). That would imply that we’re
            sending multiple pieces of data at once. Since data is inherently
            multidimensional and has many features, we would have matrices with
            very large dimensions. However, the XOR problem simplifies the
            dimensions for us, as there are only two features (0 or 1) and 4
            possible pieces of input data (four possible binary combinations of
            0 and 1). This gives us a 4x2 matrix, where 4 is the number of rows
            (batch size) and 2 is the number of columns (feature size). Another
            simplification we’re making for our systolic array example here is
            that we’ll use a 2x2 instead of the 256x256 array used in the TPUv1.
            However, the math is still faithful so nothing is actually dumbed
            down, rather scaled instead!
          </p>
          <h3 className="text-sm md:text-base font-semibold text-neutral-800">
            Worked example
          </h3>
          <p>Now let’s try an example with real numbers:</p>
          <p>
            Our systolic array takes two inputs: the input matrix and the weight
            matrix.
          </p>
          <h3 className="text-sm md:text-base font-semibold text-neutral-800">
            Input and weight scheduling
          </h3>
          <p>To input our input batch within the systolic array, we need to:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Rotate our X matrix by 90 degrees</li>
            <li>STAGGER the inputs</li>
          </ul>
          <p className="mt-2">To input our weight matrix: we need to:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Stagger the weight matrix (similar to the inputs)</li>
            <li>Transpose it!</li>
          </ul>
          <p className="mt-2">
            Note that the transpose is just for mathematical bookkeeping –
            it&apos;s required to make the matrix math work because of how we
            set up our weight pointers within the neural network drawing. It is
            simply required to make the matrix multiplication mathematically
            legal.
          </p>
          <h3 className="text-sm md:text-base font-semibold text-neutral-800">
            Staggering and FIFOs
          </h3>
          <p>
            To perform the staggering, we designed near-identical accumulators
            for the weights and inputs that would sit above and to the left of
            the systolic array, respectively.
          </p>
          <p>
            Since the activations are fed into the systolic array one-by-one, we
            thought a first-in-first-out queue (FIFO) would be the optimal data
            storage option. There was a slight difference between a traditional
            FIFO and the accumulators we built, however. Our accumulators had 2
            input ports — one for writing weights manually to the FIFO and one
            for writing the previous layer’s outputs from the activation modules
            BACK into the input FIFOs (the previous layer’s outputs are inputs
            for the current layer).
          </p>
          <p>
            We also needed to load the weights in a similar fashion for every
            layer, so we replicated the logic for the weight FIFOs, without the
            second port.
          </p>
          <p className="italic">[INSERT DRAWING OF MATMUL MATH]</p>
          <p className="italic">[INSERT GIF OF SYSTOLIC ARRAY COMPUTING IT]</p>
          <h3 className="text-sm md:text-base font-semibold text-neutral-800">
            Bias and activation
          </h3>
          <p>
            The next step in the equation is adding the bias. To do this in
            hardware, we need to create a bias module under each column of the
            systolic array. We can see that as the sums move out of the last row
            within the systolic array, we can immediately stream them into our
            bias modules to compute our pre-activations. We will denote these
            values with the variable Z.
          </p>
          <p>
            Now our equation is starting to look a lot like what we’ve learned
            in high school –but just in multidimensional form, where each column
            that streams out of the systolic array represents its own feature!
          </p>
          <p>
            Next we have to apply the activation, for which we chose Leaky ReLU.
            This is also an element-wise operation, similar to the bias, meaning
            we need an activation module under every bias module (and by proxy
            under every column of the systolic array) and we can stream the
            outputs of our bias modules into the activation modules immediately.
          </p>
          <p className="italic">
            [INSERT DRAWING OF SYS ARRAY + BIAS + LR MODULES]
          </p>
          <h3 className="text-sm md:text-base font-semibold text-neutral-800">
            Pipelining
          </h3>
          <p>
            Now you might be asking – why don&apos;t we merge the bias term and
            the activation term in one clock cycle? Well, this is because of
            something called pipelining! Pipelining allows multiple operations
            to be executed simultaneously across different stages of the TPU
            —instead of waiting for one complete operation to finish before
            starting the next, you break the work into stages that can overlap.
            Think of it like an assembly line: while one worker (activation
            module) processes a part, the previous worker (bias module) is
            already working on the next part. This keeps all of the modules busy
            rather than having them sit idle waiting for the previous stage to
            complete. It also affects the speed at which we can run our TPU — if
            we have one module that tries to squeeze many operations in a single
            cycle, our clock speed will be bottlenecked by that module, as the
            other modules can only run as fast as that single module. Therefore,
            it&apos;s efficient and best practice to split up operations into
            individual clock cycles as much as possible.
          </p>
          <p>
            Another mechanism we used to run our chip as efficiently as
            possible, was a propagating &quot;start&quot; signal, which we
            called a travelling chip enable (denoted by the red dot). Because
            everything in our design was staggered, we realized that we could
            very elegantly assert a start signal for a single clock cycle at the
            first accumulator and have it propagate to neighbouring modules
            exactly when they needed to be turned on.
          </p>
          <p>
            This would extend into the systolic array and eventually the bias
            and activation modules, where neighbouring PEs and modules, moving
            from the top left to the bottom right, were turned on in consecutive
            clock cycles. This ensured that every module was only performing
            computations when it was required to and wasn’t wasting power in the
            background.
          </p>
          <p className="italic">[INSERT DIAGRAM TO EXPLAIN PIPELINING]</p>
          <h3 className="text-sm md:text-base font-semibold text-neutral-800">
            Double buffering
          </h3>
          <p>
            If you haven’t already noticed, this allows the systolic array to do
            something powerful…continuous inference!!! We can continuously
            stream in new weights and inputs and compute forward pass for as
            many layers as we want. This touches into a core design philosophy
            of the systolic array: we want to maximize PE usage. We always want
            to keep the systolic array fed!
          </p>
          <h3 className="text-sm md:text-base font-semibold text-neutral-800">
            Control unit and ISA
          </h3>
          <p>
            Our final step for inference was making a control unit to use a
            custom instruction set to assert all of our control flags and load
            data through a data bus. Including the data bus, our ISA was 24 bits
            long and it made our testbench more elegant as we could pass a
            single string of bits every clock cycle, rather than individually
            setting multiple flags.
          </p>
          <p>
            We then put everything together and got inference completely
            working! This was a big milestone for us and we were very proud
            about what we had accomplished.
          </p>
          <p className="italic">[INSERT VIDEO OF US SOLVING INFERENCE?]</p>

          <div className="relative mt-12 w-full h-56 md:h-72">
            <Image
              src="/longchain.svg"
              alt="Long chain diagram"
              fill
              className="object-contain"
            />
          </div>

          <h2 className="text-base md:text-lg font-semibold text-neutral-800 mt-10">
            Backpropagation and Training
          </h2>
          <div className="space-y-4 md:space-y-6">
            <p>
              Ok we&apos;ve solved inference — but what about training? Well
              here&apos;s the beauty: We can use the same architecture we use
              for inference for training! Why? Because training is just matrix
              multiplications with a few extra steps.
            </p>
            <p>
              Here&apos;s where things get really exciting. Let&apos;s say we
              just ran inference on the XOR problem and got a prediction that
              looks something like [0.8, 0.3, 0.1, 0.9] when we actually wanted
              [1, 0, 0, 1]. Our model is performing poorly! We need to make it
              better. This is where training comes in. We&apos;re going to use
              something called a loss function to tell our model exactly how
              poorly it&apos;s doing. For simplicity, we chose Mean Squared
              Error (MSE) — think of it like measuring the &quot;distance&quot;
              between what we predicted and what we actually wanted, just like
              how you might measure how far off target your basketball shot was.
            </p>
            <p>
              So right after we finish computing our final layer&apos;s
              activations (let&apos;s call them H[2]), we immediately stream
              them into a loss module to calculate just how bad our predictions
              are. These loss modules sit right below our activation modules,
              and we only use them when we&apos;ve reached our final layer. But
              here&apos;s the key insight: you don&apos;t actually need to
              calculate the loss value itself to train. You just need its
              derivative. Why? Because that derivative tells us which direction
              to adjust our weights to make the loss smaller. It&apos;s like
              having a compass that points toward &quot;better
              performance.&quot;
            </p>
            <h3 className="text-sm md:text-base font-semibold text-neutral-800">
              The magic of the chain rule
            </h3>
            <p>
              This is where calculus enters the picture. To make our model
              better, we need to figure out how changing each weight affects our
              loss. The chain rule lets us break this massive calculation into
              smaller, manageable pieces.
            </p>
            <p className="italic">[INSERT COMPUTATIONAL GRAPH]</p>
            <p>
              Let&apos;s trace through what happens step by step. First, we
              calculate dL/dH[2] — how much the loss changes with respect to our
              final activations. Instead of using input accumulators like we did
              for inference, we created a scratchpad memory to store our target
              values and stream them directly into a derivative loss module
              alongside our H[2] values. You&apos;ll notice a really cool
              pattern emerging: all these modules that sit underneath the
              systolic array process column vectors that stream out one by one.
              This gave us the idea to unify them into something we called a
              vector processing unit (VPU) — because that&apos;s exactly what
              they&apos;re doing, processing vectors element-wise!
            </p>
            <p className="italic">
              [INSERT DIAGRAM/GIF WITH UB, VPU, and SYS ARRAY]
            </p>
            <p>
              As we continued tracing through the computational graph, we
              realized we needed to compute element- wise multiplications too.
              So we added an element-wise multiplication module to our VPU. We
              also created a leaky ReLU derivative module, and here&apos;s a
              clever optimization: since we only use the H[2] values once (for
              computing dH[2]/dZ[2]), we created a tiny cache within our vector
              unit instead of storing them in our main scratchpad memory.
            </p>
            <h3 className="text-sm md:text-base font-semibold text-neutral-800">
              The beautiful symmetry of forward and backward pass
            </h3>
            <p>
              After drawing out the entire computational graph, we discovered
              something remarkable: the longest chain in backpropagation closely
              resembles forward pass! In forward pass, we multiply activation
              matrices with transposed weight matrices. In backward pass, we
              multiply gradient matrices with weight matrices (untransposed).
              It&apos;s like looking in a mirror!
            </p>
            <p>
              But before we dive into implementation, we need to understand
              three fundamental mathematical identities that govern how
              gradients flow through our network:
            </p>
            <ul className="list-disc list-inside">
              <li>
                If we have Z = X@W^T and take its derivative with respect to the
                weights, we get dZ/dW = X
              </li>
              <li>
                If we have Z = X@W^T and take its derivative with respect to the
                inputs X, we get dZ/dX = W^T
              </li>
              <li>For the bias term, the derivative is simply 1</li>
            </ul>
            <p>
              These identities are beautiful because two of them express most of
              our gradient computations as matrix multiplications — which means
              they can run very efficiently on the same systolic array we use
              for forward pass!
            </p>
            <h3 className="text-sm md:text-base font-semibold text-neutral-800">
              Computing derivatives in hardware: The Leaky ReLU case
            </h3>
            <p>
              Now you might be wondering — how do we actually compute
              derivatives in hardware? Let&apos;s look at Leaky ReLU as an
              example, since it&apos;s beautifully simple but demonstrates the
              key principles. Remember that Leaky ReLU applies different
              operations based on whether the input is positive or negative. The
              derivative follows the same pattern: it outputs 1 for positive
              inputs and a small constant (we used 0.01) for negative inputs. In
              hardware, this translates to a very elegant solution:
            </p>
            <p className="italic">[INSERT CODE BLOCK]</p>
            <p>
              What&apos;s beautiful about this is that it&apos;s just a simple
              comparison and multiplexer — no complex arithmetic needed! The
              hardware can compute this derivative in a single clock cycle,
              keeping our pipeline flowing smoothly. This same principle applies
              to other activation functions: their derivatives often simplify to
              basic operations that hardware can execute very efficiently. This
              insight led us to compute the long chain first — getting all our
              dL/dZ[n] gradients just like we computed activations in forward
              pass. We could cache these gradients and reuse them, following the
              same efficient pattern we&apos;d already mastered.
            </p>
            <h3 className="text-sm md:text-base font-semibold text-neutral-800">
              Computing weight gradients
            </h3>
            <p>
              Next challenge: calculating weight gradients. Here&apos;s where
              our first identity comes into play: dL/dW = H (the activation from
              the previous layer). Since we cached our activation matrices H[0]
              and H[1] during forward pass, we can reuse them!
            </p>
            <p>We create a loop where we:</p>
            <ul className="list-disc list-inside">
              <li>Fetch a bridge node (dL/dZ[n]) from our unified buffer</li>
              <li>
                Fetch the corresponding H[n] matrix, also from unified buffer
              </li>
              <li>
                Stream these through our systolic array to compute the weight
                gradients
              </li>
            </ul>
            <p>
              And here&apos;s where something really magical happens: we can
              stream these weight gradients directly into a gradient descent
              module while we&apos;re still computing them! This module takes
              the current weights stored in memory and updates them using the
              gradients. No waiting around — everything flows like water through
              our pipeline.
            </p>
            <p>
              You might be wondering: &quot;We&apos;ve used our matrix
              multiplication identities for the long chain and weight gradients
              — how do we calculate bias gradients?&quot; Well, we&apos;ve
              actually already done most of the work! Since we&apos;re
              processing batches of data, we can simply sum (the technical term
              is &quot;reduce&quot;) the dL/dZ[n] gradients across the batch
              dimension. The beauty is that we can do this reduction right when
              we&apos;re computing the long chain — no extra work required!
            </p>
            <h3 className="text-sm md:text-base font-semibold text-neutral-800">
              Putting it all together
            </h3>
            <p>
              By continuing this same process iteratively — forward pass,
              backward pass, weight updates — we can train our network until it
              performs exactly how we want. The same systolic array that powered
              our inference now powers our training, with just a few additional
              modules to handle the gradient computations. What started as a
              simple idea about matrix multiplication has grown into a complete
              training system. Every component works together in harmony: data
              flows through pipelines, modules operate in parallel, and our
              systolic array stays fed with useful work. This is the essence of
              what makes TPUs so powerful — they take the fundamental operations
              that neural networks need and implement them in the most efficient
              way possible, keeping all the hardware busy and the data flowing
              smoothly from start to finish.
            </p>
          </div>
        </div>
        <hr className="mt-10 md:mt-16 mb-4 border-neutral-200" />
        <h2 className="text-xs uppercase tracking-wide text-neutral-500">
          Footnotes
        </h2>
        <p id="fn1" className="text-xs md:text-sm text-neutral-700 mt-2">
          [1] We firmly believe in &quot;how you do anything is how you do
          everything&quot;
        </p>

        <footer className="mt-10">
          <ul className="space-y-2">
            <li className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <span className="text-neutral-800">Xander Chin</span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://x.com/XanderChin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Xander on Twitter/X"
                  className="text-neutral-500 hover:text-neutral-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="currentColor"
                  >
                    <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.564-2.005.974-3.127 1.195-.897-.959-2.178-1.559-3.594-1.559-2.723 0-4.932 2.21-4.932 4.932 0 .39.045.765.127 1.124-4.094-.205-7.725-2.167-10.159-5.144-.424.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.6 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.402 4.768 2.221 7.557 2.221 9.054 0 14-7.496 14-13.986 0-.209 0-.423-.015-.637.961-.695 1.8-1.562 2.46-2.549z" />
                  </svg>
                </a>
                <a
                  href="mailto:"
                  aria-label="Email Xander"
                  className="text-neutral-500 hover:text-neutral-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="currentColor"
                  >
                    <path d="M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v10.5A2.75 2.75 0 0 1 19.25 20H4.75A2.75 2.75 0 0 1 2 17.25V6.75zm1.5 0v.2l8.3 5.18 8.2-5.18v-.2A1.25 1.25 0 0 0 19.25 5.5H4.75A1.25 1.25 0 0 0 3.5 6.75zm17 2.03-7.56 4.77a2.25 2.25 0 0 1-2.38 0L3.5 8.78v8.47c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V8.78z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/XanderChin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Xander on GitHub"
                  className="text-neutral-500 hover:text-neutral-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.37-3.37-1.37-.45-1.17-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.64-1.37-2.22-.26-4.56-1.13-4.56-5.03 0-1.11.39-2.01 1.03-2.72-.1-.26-.45-1.31.1-2.74 0 0 .84-.27 2.75 1.03a9.16 9.16 0 0 1 5 0c1.9-1.3 2.74-1.03 2.74-1.03.55 1.43.2 2.48.1 2.74.64.71 1.03 1.62 1.03 2.72 0 3.91-2.34 4.77-4.57 5.03.36.32.69.94.69 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.05 10.05 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
                  </svg>
                </a>
              </div>
            </li>

            <li className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <span className="text-neutral-800">Surya Sure</span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://x.com/suryasure05"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Surya on Twitter/X"
                  className="text-neutral-500 hover:text-neutral-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="currentColor"
                  >
                    <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.564-2.005.974-3.127 1.195-.897-.959-2.178-1.559-3.594-1.559-2.723 0-4.932 2.21-4.932 4.932 0 .39.045.765.127 1.124-4.094-.205-7.725-2.167-10.159-5.144-.424.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.6 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.402 4.768 2.221 7.557 2.221 9.054 0 14-7.496 14-13.986 0-.209 0-.423-.015-.637.961-.695 1.8-1.562 2.46-2.549z" />
                  </svg>
                </a>
                <a
                  href="mailto:"
                  aria-label="Email Surya"
                  className="text-neutral-500 hover:text-neutral-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="currentColor"
                  >
                    <path d="M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v10.5A2.75 2.75 0 0 1 19.25 20H4.75A2.75 2.75 0 0 1 2 17.25V6.75zm1.5 0v.2l8.3 5.18 8.2-5.18v-.2A1.25 1.25 0 0 0 19.25 5.5H4.75A1.25 1.25 0 0 0 3.5 6.75zm17 2.03-7.56 4.77a2.25 2.25 0 0 1-2.38 0L3.5 8.78v8.47c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V8.78z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/suryasure05"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Surya on GitHub"
                  className="text-neutral-500 hover:text-neutral-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.37-3.37-1.37-.45-1.17-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.64-1.37-2.22-.26-4.56-1.13-4.56-5.03 0-1.11.39-2.01 1.03-2.72-.1-.26-.45-1.31.1-2.74 0 0 .84-.27 2.75 1.03a9.16 9.16 0 0 1 5 0c1.9-1.3 2.74-1.03 2.74-1.03.55 1.43.2 2.48.1 2.74.64.71 1.03 1.62 1.03 2.72 0 3.91-2.34 4.77-4.57 5.03.36.32.69.94.69 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.05 10.05 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
                  </svg>
                </a>
              </div>
            </li>

            <li className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <span className="text-neutral-800">Evan Lin</span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://x.com/evanliin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Evan on Twitter/X"
                  className="text-neutral-500 hover:text-neutral-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="currentColor"
                  >
                    <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.564-2.005.974-3.127 1.195-.897-.959-2.178-1.559-3.594-1.559-2.723 0-4.932 2.21-4.932 4.932 0 .39.045.765.127 1.124-4.094-.205-7.725-2.167-10.159-5.144-.424.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.6 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.402 4.768 2.221 7.557 2.221 9.054 0 14-7.496 14-13.986 0-.209 0-.423-.015-.637.961-.695 1.8-1.562 2.46-2.549z" />
                  </svg>
                </a>
                <a
                  href="mailto:"
                  aria-label="Email Evan"
                  className="text-neutral-500 hover:text-neutral-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="currentColor"
                  >
                    <path d="M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v10.5A2.75 2.75 0 0 1 19.25 20H4.75A2.75 2.75 0 0 1 2 17.25V6.75zm1.5 0v.2l8.3 5.18 8.2-5.18v-.2A1.25 1.25 0 0 0 19.25 5.5H4.75A1.25 1.25 0 0 0 3.5 6.75zm17 2.03-7.56 4.77a2.25 2.25 0 0 1-2.38 0L3.5 8.78v8.47c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V8.78z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/evanliin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Evan on GitHub"
                  className="text-neutral-500 hover:text-neutral-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.37-3.37-1.37-.45-1.17-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.64-1.37-2.22-.26-4.56-1.13-4.56-5.03 0-1.11.39-2.01 1.03-2.72-.1-.26-.45-1.31.1-2.74 0 0 .84-.27 2.75 1.03a9.16 9.16 0 0 1 5 0c1.9-1.3 2.74-1.03 2.74-1.03.55 1.43.2 2.48.1 2.74.64.71 1.03 1.62 1.03 2.72 0 3.91-2.34 4.77-4.57 5.03.36.32.69.94.69 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.05 10.05 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
                  </svg>
                </a>
              </div>
            </li>

            <li className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <span className="text-neutral-800">Kenny Guo</span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://x.com/kennykgguo"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Kenny on Twitter/X"
                  className="text-neutral-500 hover:text-neutral-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="currentColor"
                  >
                    <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.564-2.005.974-3.127 1.195-.897-.959-2.178-1.559-3.594-1.559-2.723 0-4.932 2.21-4.932 4.932 0 .39.045.765.127 1.124-4.094-.205-7.725-2.167-10.159-5.144-.424.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.6 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.402 4.768 2.221 7.557 2.221 9.054 0 14-7.496 14-13.986 0-.209 0-.423-.015-.637.961-.695 1.8-1.562 2.46-2.549z" />
                  </svg>
                </a>
                <a
                  href="mailto:"
                  aria-label="Email Kenny"
                  className="text-neutral-500 hover:text-neutral-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="currentColor"
                  >
                    <path d="M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v10.5A2.75 2.75 0 0 1 19.25 20H4.75A2.75 2.75 0 0 1 2 17.25V6.75zm1.5 0v.2l8.3 5.18 8.2-5.18v-.2A1.25 1.25 0 0 0 19.25 5.5H4.75A1.25 1.25 0 0 0 3.5 6.75zm17 2.03-7.56 4.77a2.25 2.25 0 0 1-2.38 0L3.5 8.78v8.47c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V8.78z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/kennykgguo"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Kenny on GitHub"
                  className="text-neutral-500 hover:text-neutral-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.37-3.37-1.37-.45-1.17-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.64-1.37-2.22-.26-4.56-1.13-4.56-5.03 0-1.11.39-2.01 1.03-2.72-.1-.26-.45-1.31.1-2.74 0 0 .84-.27 2.75 1.03a9.16 9.16 0 0 1 5 0c1.9-1.3 2.74-1.03 2.74-1.03.55 1.43.2 2.48.1 2.74.64.71 1.03 1.62 1.03 2.72 0 3.91-2.34 4.77-4.57 5.03.36.32.69.94.69 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.05 10.05 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
                  </svg>
                </a>
              </div>
            </li>
          </ul>
        </footer>
      </div>
    </main>
  );
}
