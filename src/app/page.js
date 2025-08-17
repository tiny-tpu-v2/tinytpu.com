import { Roboto_Mono } from "next/font/google";
import Image from "next/image";
import { BlockMath, InlineMath } from "react-katex";
import Slideshow from "../components/slideshow";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

const pe_verilogSnippet = `always_ff @(posedge clk or posedge rst) begin
        if (rst) begin
            input_out <= 0;
            psum_out <= 0;
            weight_reg <= 0;
        end else if (load_weight) begin
            weight_reg <= weight;
        end else if (start) begin
            input_out <= input_in;
            // the main multiply-accumulate operation
            psum_out <= (input_in * weight_reg) + psum_in;
        end
    end`;

const clock_cycle_verilogSnippet = `module add (
    input wire clk,
    // reset signal to reset the module
    input wire rst,

    // registers to hold the input and output values
    input reg a,
    input reg b,
    output reg c
  );
    
    always @(posedge clk) begin 

    // everything in this block will be executed every clock cycle
    
      if (rst) begin
      // reset the output to 0 when the reset signal is high
        c <= 0; 
      end else begin
        // add the two inputs and store the result in the output
        c <= a + b; 
      end
    end

endmodule
`;

const leaky_relu_derivative_verilogSnippet = `always @(posedge clk) begin
    if (rst) begin
        output <= 0;
    end else begin
        output <= (input > 0) ? input : 0.01 * input;
    end
end
`;

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
    .replace(/(&lt;=|==|\+|\*|\(|\))/g, '<span class="text-gray-700">$1</span>')
    .replace(/\/\/.*$/gm, '<span class="text-gray-400">$&</span>')
    .replace(/\/\*[\s\S]*?\*\//g, '<span class="text-gray-400">$&</span>');
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
        <figure className="w-full">
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
          <figcaption className="text-sm text-center text-gray-600 mt-2">
            Overview of the TPU architecture and its key components
          </figcaption>
        </figure>

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

        {/* Slideshow 1 */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <Slideshow
            slides={[
              "/slideshow_1/1.png",
              "/slideshow_1/2.png",
              "/slideshow_1/3.png",
              "/slideshow_1/4.png",
              "/slideshow_1/5.png",
            ]}
            title="Slideshow 1: TPU Architecture Overview"
            aspectRatio="aspect-[2228/1944]"
          />
        </div>

        {/* Slideshow 2 */}
        <div className="mt-8 pt-8 border-t border-neutral-200">
          <Slideshow
            slides={[
              "/slideshow_2/1.png",
              "/slideshow_2/2.png",
              "/slideshow_2/3.png",
            ]}
            title="Slideshow 2: Implementation Details"
            aspectRatio="aspect-[2228/2739]"
          />
        </div>

        {/* Slideshow 3 */}
        <div className="mt-8 pt-8 border-t border-neutral-200">
          <Slideshow
            slides={[
              "/slideshow_3/1.png",
              "/slideshow_3/2.png",
              "/slideshow_3/3.png",
              "/slideshow_3/4.png",
              "/slideshow_3/5.png",
              "/slideshow_3/6.png",
              "/slideshow_3/7.png",
              "/slideshow_3/8.png",
              "/slideshow_3/9.png",
            ]}
            title="Slideshow 3: Advanced Topics"
            aspectRatio="aspect-[2228/2739]"
          />
        </div>

        <h2 className="text-base md:text-lg font-semibold text-neutral-800 mb-1 mt-12">
          Background
        </h2>
        <p>Why did we start this project?</p>
        <br />
        <p>
          We wanted to do something very challenging to prove to ourselves that
          we can do anything we put our mind to. The reasoning for why we chose
          to build a TPU specifically is fairly simple:
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
          which, in a way, made the TPU even more appealing since we
          weren&apos;t able to estimate exactly how difficult it would be. As we
          worked on the initial stages of this project, we established a strict
          design philosophy: ALWAYS TRY THE HACKY WAY. This meant trying out the
          &quot;dumb&quot; ideas that came to our mind first BEFORE consulting
          external sources. This philosophy helped us make sure we weren&apos;t
          reverse engineering the TPU, but rather <b>re-inventing it</b>, which
          helped us derive many of the key mechanisms used in the TPU ourselves.
        </p>
        <br />
        <p>
          We also wanted to treat this project as an exercise to code without
          relying on AI to write for us, since we felt that our initial instinct
          recently has been to reach for these AI tools whenever we faced a
          slight struggle. We wanted to cultivate a certain{" "}
          <b>style of thinking</b> that we could take forward with us and use in
          any future endeavours to think through difficult problems.
          <sup className="ml-1 text-[12px]">
            <a
              href="#fn1"
              className="no-underline text-purple-700 hover:text-purple-900"
            >
              [1]
            </a>
          </sup>
        </p>

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
            covers and what it doesn&apos;t. Note that this is NOT a 1-to-1
            replica of the TPU — it is our attempt at re-inventing the TPU
            ourselves.
          </p>
        </div>
        <br />
        <h2 className="text-base md:text-lg font-semibold text-neutral-800 mb-1">
          What is a TPU?
        </h2>
        <div className="space-y-4 md:space-y-6">
          <p>
            A TPU is an application specific chip (ASIC) designed by Google to
            make inferencing (using) and training ML models faster and more
            efficient. Whereas a GPU can be used to render frames AND run ML
            workloads, a TPU can only perform math operations, allowing it to be
            better at what it&apos;s designed for. Naturally, trying to master a
            single task is much easier and will yield better results than trying
            to master multiple tasks and the TPU strongly employs this
            philosophy.
          </p>

          <div className="pl-4 ml-4 border-l-4 border-neutral-300">
            <p>
              <i>Quick primer on hardware design:</i>
              <br />
              <br />
              In hardware, the unit of time we&apos;re dealing with is called a
              clock cycle. This is an arbitrary period of time that we can set,
              as developers, to meet our requirements. Generally, a single clock
              cycle can range from 1 picosecond (ps) to 1 nanosecond (ns) and
              any operations we run will be executed BETWEEN clock cycles.
            </p>

            <figure className="my-6">
              <div className="flex justify-center">
                <Image
                  src="/clock-cycle.svg"
                  alt="Clock cycle diagram"
                  width={679}
                  height={269}
                  className="max-w-full h-auto"
                />
              </div>
              <figcaption className="text-sm text-center text-gray-600 mt-2">
                Clock cycle timing diagram showing how operations are
                synchronized in hardware
              </figcaption>
            </figure>
            <br />
            <p>
              The language we use to describe hardware is called Verilog.
              It&apos;s a hardware description language that allows us to
              describe the behaviour of a given hardware module (similar to
              functions in software), but instead of executing as a program, it
              synthesizes into boolean logic gates (AND, OR, NOT, etc.) that can
              be combined to build the ditial logic for any chip we want.
              Here&apos;s a simple example of an addition in Verilog:
            </p>
            <br />
            <pre
              className={`${robotoMono.className} border border-black rounded-md bg-white p-4 text-xs sm:text-sm md:text-base overflow-x-auto whitespace-pre md:whitespace-pre-wrap`}
            >
              <code
                dangerouslySetInnerHTML={{
                  __html: highlightVerilog(clock_cycle_verilogSnippet),
                }}
              />
            </pre>
            <br />
            <p>
              In the example above, the value of the signal b at the next clock
              cycle is set to the current value of the signal a. You&apos;ll
              find that in most cases, signals (variables) are updated in
              sequential clock cycles, as opposed to immediate updates like you
              would find in software design.
            </p>
          </div>
          <p>
            We can use numbers to prove the TPU&apos;s efficiency: BERT-Large
            (an open-source language model) was trained on a GPU cluster and a
            TPUv3 pod. The TPU pod was 1.8x faster and had a 2.4x better power
            efficiency.
          </p>
          <p>
            Specifically, the TPU is very efficient at performing matrix
            multiplications, which make up 80-90% of the compute operations in
            transformers (up to 95% in very large models) and 70-80% in CNNs.
            Each matrix multiplication represents the calculation for a single
            layer in an MLP, and in deep learning, we have many of these layers,
            making TPUs increasingly efficient for larger models.
          </p>
        </div>
        <br />
        <h2 className="text-base md:text-lg font-semibold text-neutral-800 mb-1">
          How did we develop the TPU?
        </h2>
        <div className="space-y-4 md:space-y-6">
          <p>
            When we started this project, all we knew was that the equation y =
            mx + b is the foundational building block for neural networks.
            However, we needed to fully UNDERSTAND the math behind neural
            networks to build other modules in our TPU. So before we started
            writing any code, each of us worked out the math of a simple 2 -&gt;
            2 -&gt; 1 multi-layer perceptron (MLP).
          </p>

          <br></br>

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
            can&apos;t be achieved with ONLY linear equations.
          </p>
          <figure className="my-6">
            <div className="flex justify-center">
              <Image
                src="/xor-mlp.svg"
                alt="XOR MLP Neural Network Architecture showing 2 input nodes, 2 hidden layer nodes, and 1 output node with weight connections"
                width={679}
                height={269}
                className="max-w-full h-auto"
              />
            </div>
            <figcaption className="text-sm text-center text-gray-600 mt-2">
              Architecture of our 2→2→1 multi-layer perceptron for solving the
              XOR problem
            </figcaption>
          </figure>
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
            (batch size) and 2 is the number of columns (feature size).
          </p>

          <div className="my-6">
            <p className="text-sm text-gray-700 mb-2">
              The XOR input matrix and target outputs:
            </p>
            <div className="text-center mb-4">
              <BlockMath
                math={`
                  \\mathbf{X} =
                  \\begin{bmatrix}
                  0 & 0 \\\\[0.3em]
                  0 & 1 \\\\[0.3em]
                  1 & 0 \\\\[0.3em]
                  1 & 1
                  \\end{bmatrix}, \\quad
                  \\mathbf{y} = \\begin{bmatrix} 0 \\\\[0.3em] 1 \\\\[0.3em] 1 \\\\[0.3em] 0 \\end{bmatrix}
                `}
              />
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Each row represents one of the four possible XOR inputs, and the
              output vector shows the expected XOR results
            </p>
          </div>

          <p>
            Another simplification we&apos;re making for our systolic array
            example here is that we&apos;ll use a 2x2 instead of the 256x256
            array used in the TPUv1. However, the math is still faithful so
            nothing is actually dumbed down, rather scaled down instead.
          </p>

          <p>
            The first step in the equation is multiplying m with x, which, in
            matrix form, would be{" "}
            <InlineMath math={"\\mathbf{X}\\mathbf{W}^T"} />.
          </p>

          <div className="my-6">
            <p className="text-sm text-gray-700 mb-2">More formally:</p>
            <div className="text-center mb-4">
              <BlockMath
                math={"\\mathbf{Z} = \\mathbf{X}\\mathbf{W}^T + \\mathbf{b}"}
              />
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              where{" "}
              <InlineMath math={"\\mathbf{X} \\in \\mathbb{R}^{n \\times d}"} />{" "}
              is our input matrix,{" "}
              <InlineMath math={"\\mathbf{W} \\in \\mathbb{R}^{m \\times d}"} />{" "}
              is our weight matrix, and{" "}
              <InlineMath math={"\\mathbf{b} \\in \\mathbb{R}^{1 \\times m}"} />{" "}
              is our bias vector
            </p>
          </div>

          <p>
            How can we perform matrix multiplication in hardware? Well, we can
            use a unit called the systolic array!
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
          <figure className="mt-6 overflow-x-auto">
            <div className="relative mx-auto w-full max-w-xl h-48 md:h-64">
              <Image
                src="/PE.svg"
                alt="PE diagram"
                fill
                className="object-contain"
              />
            </div>
            <figcaption className="text-sm text-center text-gray-600 mt-2">
              Processing Element (PE) architecture showing multiply-accumulate
              operation
            </figcaption>
          </figure>
          <div className="mt-10 md:mt-16 w-full">
            <pre
              className={`${robotoMono.className} border border-black rounded-md bg-white p-4 text-xs sm:text-sm md:text-base overflow-x-auto whitespace-pre md:whitespace-pre-wrap`}
            >
              <code
                dangerouslySetInnerHTML={{
                  __html: highlightVerilog(pe_verilogSnippet),
                }}
              />
            </pre>
          </div>
          <h3 className="text-sm md:text-base font-semibold text-neutral-800">
            Systolic matrix multiplication
          </h3>
          <p>
            When these PEs are connected together, they can be used to perform
            matrix multiplication systolically, meaning multiple elements of the
            output matrix can be calculated every clock cycle. The inputs enter
            the systolic array from the left and move to the neighbouring left
            PE every clock cycle. The accumulated sums start with the
            multiplication from the first row of PEs and move downwards and get
            added to the products of each successive PE, until they up at the
            last row of PEs where they become an element of the output matrix.
          </p>
          <figure className="mt-12">
            <div className="relative w-full h-[32rem] md:h-[40rem]">
              <Image
                src="/sys-array-standalone.svg"
                alt="Systolic array diagram"
                fill
                className="object-contain"
              />
            </div>
            <figcaption className="text-sm text-center text-gray-600 mt-2">
              Systolic array architecture showing how PEs are connected to
              perform matrix multiplication
            </figcaption>
          </figure>
          <p>
            Because of this single unit (and the fact that matrix
            multiplications dominate the computations performed in models), TPUs
            can very easily inference and train any model.
          </p>

          <h3 className="text-sm md:text-base font-semibold text-neutral-800">
            Worked example
          </h3>
          <p>Now let&apos;s walk through the example of our XOR problem:</p>
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
            <br />
            <figure>
              <div className="relative mx-auto w-full max-w-xl h-48 md:h-64">
                <Image
                  src="/rotate.svg"
                  alt="Rotate X matrix by 90 degrees"
                  fill
                  className="object-contain"
                />
              </div>
              <figcaption className="text-sm text-center text-gray-600 mt-2">
                Matrix rotation by 90 degrees to prepare for systolic array
                input
              </figcaption>
            </figure>
            <br />
            <li>STAGGER the inputs (delay each row by 1 clock cycle)</li>
            <figure className="mt-12">
              <div className="relative w-full h-48 md:h-42">
                <Image
                  src="/stagger-x.svg"
                  alt="Stagger input matrix"
                  fill
                  className="object-contain"
                />
              </div>
              <figcaption className="text-sm text-center text-gray-600 mt-2">
                Input matrix staggering pattern for systolic array processing
              </figcaption>
            </figure>
            <br />
          </ul>

          <p className="mt-2">To input our weight matrix: we need to:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Stagger the weight matrix (similar to the inputs)</li>
            <figure className="mt-12">
              <div className="relative w-full h-48 md:h-64">
                <Image
                  src="/stagger-w.svg"
                  alt="Stagger weight matrix"
                  fill
                  className="object-contain"
                />
              </div>
              <figcaption className="text-sm text-center text-gray-600 mt-2">
                Weight matrix staggering pattern for systolic array processing
              </figcaption>
            </figure>
            <li>Transpose it!</li>
            <figure className="mt-12">
              <div className="relative w-full h-48 md:h-42">
                <Image
                  src="/transpose.svg"
                  alt="Matrix transposition"
                  fill
                  className="object-contain"
                />
              </div>
              <figcaption className="text-sm text-center text-gray-600 mt-2">
                Weight matrix transposition for correct mathematical alignment
              </figcaption>
            </figure>
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
            for writing the previous layer&apos;s outputs from the activation
            modules BACK into the input FIFOs (the previous layer&apos;s outputs
            are inputs for the current layer).
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
            bias modules to compute our pre-activations.{" "}
            <b>We will denote these values with the variable Z.</b>
          </p>
          <p>
            Now our equation is starting to look a lot like what we&apos;ve
            learned in high school –but just in multidimensional form, where
            each column that streams out of the systolic array represents its
            own feature!
          </p>
          <p>
            Next we have to apply the activation, for which we chose Leaky ReLU.
            This is also an element-wise operation, similar to the bias, meaning
            we need an activation module under every bias module (and by proxy
            under every column of the systolic array) and we can stream the
            outputs of our bias modules into the activation modules immediately.
            <b>We will denote these post-activation values with H</b>.
          </p>

          <div className="my-6">
            <p className="text-sm text-gray-700 mb-2">
              The Leaky ReLU function applies element-wise:
            </p>
            <div className="text-center mb-4">
              <BlockMath
                math={
                  "\\text{LeakyReLU}_\\alpha(z) = \\begin{cases} z & \\text{if } z > 0 \\\\[0.3em] \\alpha \\cdot z & \\text{if } z \\leq 0 \\end{cases}"
                }
              />
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              where <InlineMath math={"\\alpha = 0.5"} /> is our leak factor.
              For matrices, this applies to each element independently.
            </p>
          </div>
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
          <figure className="mt-12">
            <div className="relative w-full h-56 md:h-64">
              <Image
                src="/pipelining.svg"
                alt="Pipeline diagram"
                fill
                className="object-contain"
              />
            </div>
            <figcaption className="text-sm text-center text-gray-600 mt-2">
              Pipelining stages showing how operations overlap across clock
              cycles
            </figcaption>
          </figure>
          <br />
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
            computations when it was required to and wasn&apos;t wasting power
            in the background.
          </p>
          <h3 className="text-sm md:text-base font-semibold text-neutral-800">
            Double buffering
          </h3>
          <p>
            Now, we know that starting a new layer means we must compute the
            same <InlineMath math={"\\mathbf{X}\\mathbf{W}^T"} /> using a new
            weight matrix. How can we do this if our systolic array is
            weight-stationary? How can we change the weights?
          </p>
          <p>
            While thinking about this problem, we came across the idea of double
            buffering, which originates from video games. The reason why double
            buffering exists is to prevent something called screen tearing on
            your monitor. Ultimately, pixels take time to load and we&apos;d
            like to &quot;hide away&quot; that time somehow. And if you paid
            attention, this is the exact same problem we&apos;re currently
            facing with the systolic array. Fortunately, video game designers
            have already come up with a solution for this problem. By adding a
            second &quot;shadow&quot; buffer, which holds the weights of the
            next layer while the current layer is being computed on, we can load
            in new weights during computation, cutting the total clock cycle
            count in half.
          </p>
          <p>
            To make this work, we also needed to add some signals to move the
            data. First, we needed a signal to indicate when to switch the
            weights in the shadow buffer and the active buffer. We called this
            signal the &quot;switch&quot; signal and it copied the values in the
            shadow buffer to the active buffer. It propagated from the top left
            of the systolic array to the bottom right (the same path as the
            travelling chip enable, but only within the systolic array). We then
            needed one more signal to indicate when we wanted to move the
            weights down by one row and we called this the &quot;accept&quot;
            flag (because each row is ACCEPTING a new set of weights). This
            would move the new weights into the top row of the systolic array,
            as well as each row of weights down into the next row of the
            systolic array. These two control flags worked in tandem to make our
            double buffering mechanism work.
          </p>
          <p className="italic">
            [INSERT SVG OF PREV DIAGRAM WITH DOUBLE BUFFERING]
          </p>
          <p>
            If you haven&apos;t already noticed, this allows the systolic array
            to do something powerful…continuous inference!!! We can continuously
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
              how you might measure how far off target your basketball shot was.{" "}
              <b>Let&apos;s denote the loss with L.</b>
            </p>

            <div className="my-6">
              <div className="text-center mb-4">
                <BlockMath
                  math={
                    "\\mathcal{L} = \\frac{1}{N}\\sum_{i=1}^{N}(y_i - \\hat{y}_i)^2"
                  }
                />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                where <InlineMath math={"y_i"} /> is the target output,{" "}
                <InlineMath math={"\\hat{y}_i"} /> is our prediction, and{" "}
                <InlineMath math={"N"} /> is the number of samples
              </p>
            </div>
            <p>
              So right after we finish computing our final layer&apos;s
              activations (let&apos;s call them{" "}
              <InlineMath math={"\\mathbf{H}_2"} />
              ), we immediately stream them into a loss module to calculate just
              how bad our predictions are. These loss modules sit right below
              our activation modules, and we only use them when we&apos;ve
              reached our final layer. But here&apos;s the key insight: you
              don&apos;t actually need to calculate the loss value itself to
              train. You just need its derivative. Why? Because that derivative
              tells us which direction to adjust our weights to make the loss
              smaller. It&apos;s like having a compass that points toward
              &quot;better performance.&quot;
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

            <div className="my-6">
              <p className="text-sm text-gray-700 mb-2">
                The chain rule for gradients:
              </p>
              <div className="text-center mb-4">
                <BlockMath
                  math={
                    "\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{W}} = \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{Z}} \\cdot \\frac{\\partial \\mathbf{Z}}{\\partial \\mathbf{W}}"
                  }
                />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                This allows us to compute gradients layer by layer, propagating
                them backwards through the network
              </p>
            </div>
            <div className="relative mt-12 w-full h-56 md:h-72">
              <Image
                src="/longchain.svg"
                alt="Long chain diagram"
                fill
                className="object-contain"
              />
            </div>
            <p>
              Let&apos;s trace through what happens step by step. First, we
              calculate{" "}
              <InlineMath
                math={"\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{H}_2}"}
              />{" "}
              — how much the loss changes with respect to our final activations.
              Instead of using input accumulators like we did for inference, we
              created a scratchpad memory to store our target values and stream
              them directly into a derivative loss module alongside our{" "}
              <InlineMath math={"\\mathbf{H}_2"} /> values. You&apos;ll notice a
              really cool pattern emerging: all these modules that sit
              underneath the systolic array process column vectors that stream
              out one by one. This gave us the idea to unify them into something
              we called a vector processing unit (VPU) — because that&apos;s
              exactly what they&apos;re doing, processing vectors element-wise!
            </p>
            <div className="relative mt-12 w-full h-[32rem] md:h-[40rem]">
              <Image
                src="/vpu.svg"
                alt="Vector processing unit"
                fill
                className="object-contain"
              />
            </div>
            <br />
            <p className="italic">
              [INSERT DIAGRAM/GIF WITH UB, VPU, and SYS ARRAY]
            </p>
            <p>
              As we continued tracing through the computational graph, we
              realized we needed to compute element- wise multiplications too.
              So we added an element-wise multiplication module to our VPU. We
              also created a leaky ReLU derivative module, and here&apos;s a
              clever optimization: since we only use the{" "}
              <InlineMath math={"\\mathbf{H}_2"} /> values once (for computing{" "}
              <InlineMath
                math={
                  "\\frac{\\partial \\mathbf{H}_2}{\\partial \\mathbf{Z}_2}"
                }
              />
              ), we created a tiny cache within our vector unit instead of
              storing them in our main scratchpad memory.
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
              Once we have all of these individual derivatives, we can multiply
              them together to find any derivative with respect of the loss
              (i.e. dL/dH[2] * dH/dZ[2] * dZ[2]/dW[2] gives us dL/dW[2]).
            </p>
            <ul className="list-disc list-inside">
              <li>
                If we have{" "}
                <InlineMath math={"\\mathbf{Z} = \\mathbf{X}\\mathbf{W}^T"} />{" "}
                and take its derivative with respect to the weights, we get{" "}
                <InlineMath
                  math={
                    "\\frac{\\partial \\mathbf{Z}}{\\partial \\mathbf{W}} = \\mathbf{X}"
                  }
                />
              </li>
              <li>
                If we have{" "}
                <InlineMath math={"\\mathbf{Z} = \\mathbf{X}\\mathbf{W}^T"} />{" "}
                and take its derivative with respect to the inputs{" "}
                <InlineMath math={"\\mathbf{X}"} />, we get{" "}
                <InlineMath
                  math={
                    "\\frac{\\partial \\mathbf{Z}}{\\partial \\mathbf{X}} = \\mathbf{W}^T"
                  }
                />
              </li>
              <li>For the bias term, the derivative is simply 1</li>
            </ul>
            <p>
              The formula for dL/dH[2] is [INSERT LATEX]. Since it&apos;s an
              element-wise computation, we can have a loss module right under
              the activation module for each column in the systolic array to
              compute the loss right after we compute the outputs.
            </p>
            <p>
              Now you might be wondering — how do we actually compute
              derivatives in hardware? Let&apos;s look at Leaky ReLU as an
              example, since it&apos;s beautifully simple but demonstrates the
              key principles. Remember that Leaky ReLU applies different
              operations based on whether the input is positive or negative. The
              derivative follows the same pattern: it outputs 1 for positive
              inputs and a small constant (we used 0.01) for negative inputs.
            </p>

            <div className="my-6">
              <p className="text-sm text-gray-700 mb-2">
                The Leaky ReLU gradient:
              </p>
              <div className="text-center mb-4">
                <BlockMath
                  math={
                    "\\frac{\\partial \\text{LeakyReLU}_\\alpha(z)}{\\partial z} = \\begin{cases} 1 & \\text{if } z > 0 \\\\[0.3em] \\alpha & \\text{if } z \\leq 0 \\end{cases}"
                  }
                />
              </div>
            </div>

            <p>In hardware, this translates to a very elegant solution:</p>
            <p>
              Now you might be wondering – how do we actually compute
              derivatives of activation functions in hardware? Remember that
              Leaky ReLU applies different operations based on whether the input
              is positive or negative. The derivative follows the same pattern:
              it outputs 1 for positive inputs and a small constant called the
              leak factor (we used 0.01) for negative inputs. In hardware, this
              translates to a very elegant solution:
            </p>
            <pre
              className={`${robotoMono.className} border border-black rounded-md bg-white p-4 text-xs sm:text-sm md:text-base overflow-x-auto whitespace-pre md:whitespace-pre-wrap`}
            >
              {leaky_relu_derivative_verilogSnippet}
            </pre>
            <figure className="mt-12">
              <div className="relative w-full h-66 md:h-85">
                <Image
                  src="/leaky-relu-derivative.svg"
                  alt="Leaky ReLU derivative"
                  fill
                  className="object-contain"
                />
              </div>
              <figcaption className="text-sm text-center text-gray-600 mt-2">
                Leaky ReLU derivative implementation in hardware showing the
                conditional logic
              </figcaption>
            </figure>
            <p>
              What&apos;s beautiful about this is that it&apos;s just a simple
              comparison – no complex arithmetic needed. The hardware can
              compute this derivative in a single clock cycle, keeping our
              pipeline flowing smoothly. This same principle applies to other
              activation functions: their derivatives often simplify to basic
              operations that hardware can execute very efficiently. This
              insight led us to compute the long chain first — getting all our
              <InlineMath
                math={"\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{Z}_n}"}
              />{" "}
              gradients just like we computed activations in forward pass. We
              could cache these gradients and reuse them, following the same
              efficient pattern we&apos;d already mastered.
            </p>
            <p>
              You&apos;ll notice a really cool pattern emerging: all these
              modules that sit underneath the systolic array process column
              vectors that stream out one by one. This gave us the idea to unify
              them into something we called a vector processing unit (VPU) –
              because that&apos;s exactly what they&apos;re doing, processing
              vectors element-wise! Not only is this more elegant to work with,
              it&apos;s also useful when we scale our TPU beyond a 2x2 systolic
              array, as we&apos;ll have N number of these modules (N being the
              size of the systolic array), each of which we would have to
              interface with individually. Unifying these modules under a parent
              module makes our design more scalable and elegant!
            </p>
            <br />
            <figure className="mt-12">
              <div className="relative w-full h-66 md:h-150">
                <Image
                  src="/vpu.svg"
                  alt="Vector processing unit"
                  fill
                  className="object-contain"
                />
              </div>
              <figcaption className="text-sm text-center text-gray-600 mt-2">
                Vector Processing Unit (VPU) architecture showing unified
                element-wise operations
              </figcaption>
            </figure>
            <br />
            <p>
              The next few derivatives are interesting because we can actually
              use matrix multiplication (and systolic array!) to compute the
              derivatives with the help of these three identities:
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-2">
              <li>
                If we have{" "}
                <InlineMath math={"\\mathbf{Z} = \\mathbf{X}\\mathbf{W}^T"} />{" "}
                and take its derivative with respect to the weights, we get{" "}
                <InlineMath
                  math={
                    "\\frac{\\partial \\mathbf{Z}}{\\partial \\mathbf{W}} = \\mathbf{X}"
                  }
                />
              </li>
              <li>
                If we have{" "}
                <InlineMath math={"\\mathbf{Z} = \\mathbf{X}\\mathbf{W}^T"} />{" "}
                and take its derivative with respect to the inputs{" "}
                <InlineMath math={"\\mathbf{X}"} />, we get{" "}
                <InlineMath
                  math={
                    "\\frac{\\partial \\mathbf{Z}}{\\partial \\mathbf{X}} = \\mathbf{W}^T"
                  }
                />{" "}
                (just the weight matrix)
              </li>
              <li>For the bias term, the derivative is simply 1.</li>
            </ol>
            <p>
              This means that we can multiply the previous{" "}
              <InlineMath
                math={"\\frac{\\partial \\mathbf{H}}{\\partial \\mathbf{Z}}"}
              />{" "}
              with <InlineMath math={"\\mathbf{X}"} />,{" "}
              <InlineMath math={"\\mathbf{W}^T"} />, and 1 to get{" "}
              <InlineMath
                math={"\\frac{\\partial \\mathbf{Z}}{\\partial \\mathbf{W}}"}
              />
              ,{" "}
              <InlineMath
                math={"\\frac{\\partial \\mathbf{Z}}{\\partial \\mathbf{X}}"}
              />
              , and{" "}
              <InlineMath
                math={"\\frac{\\partial \\mathbf{Z}}{\\partial \\mathbf{b}}"}
              />
              , respectively. And because all of the gradients are actually
              gradient matrices, we can use the systolic array!
            </p>
            <p>
              Now something to note about the activation derivative dH[2]/dZ[2]
              and the weight derivative dZ/dW is that they both require the
              post-activations (H) we calculate during forward pass to be
              computed. This means the outputs of every layer in some form of
              memory to be able to perform training. Here&apos;s where we
              created a new scratchpad memory module which we called the unified
              buffer (UB). This lets us store our H values immediately after we
              compute them during forward pass.
            </p>
            <p>
              We realized that we can also get rid of the input and weight
              accumulators, as well as manually loading the bias and leak
              factors into their respective modules, by using the UB to store
              them. This is also better practice, rather than loading in new
              data every clock cycle with the instruction set. Since we want to
              access two values (2 inputs or 2 weights for each row/col of the
              systolic array) at the same time, we added TWO read and write
              ports. We did this for each data primitive (inputs, weights, bias,
              leak factor, post activations) to minimize data contention since
              we have many different types of data.
            </p>
            <p>
              To read values, we supply a starting address and the number of
              values, we supply a starting address and the number of locations
              we want the UB to read and it will read 2 values every clock
              cycle. Writing is a similar mechanism, where we specify which
              values we want to write to each of the two input ports. The beauty
              in the read mechanism is that it runs in the background once we
              supply a starting address until the number of locations given are
              read, meaning we only need to provide an instruction for this
              every few clock cycles.
            </p>
            <figure className="mt-12">
              <div className="relative w-full h-66 md:h-102">
                <Image
                  src="/ub-diagram.svg"
                  alt="Unified Buffer diagram"
                  fill
                  className="object-contain"
                />
              </div>
              <figcaption className="text-sm text-center text-gray-600 mt-2">
                Unified Buffer (UB) architecture showing dual-port read
                mechanism
              </figcaption>
            </figure>
            <figure className="mt-12">
              <div className="relative w-full h-66 md:h-82">
                <Image
                  src="/ub-waveform.svg"
                  alt="Unified Buffer waveform"
                  fill
                  className="object-contain"
                />
              </div>
              <figcaption className="text-sm text-center text-gray-600 mt-2">
                Unified Buffer timing waveform showing read operation
              </figcaption>
            </figure>
            <p>
              At the end of the day, not having these mechanisms wouldn&apos;t
              break having these mechanisms wouldn&apos;t break the TPU — but
              they allow us to always keep the systolic array fed, which is a
              core design principle we couldn&apos;t compromise.
            </p>
            <p>
              While we were working on this, we realized we could make one last
              small optimization for the activation derivative module — since we
              only use the H[2] values once (for computing dH[2]/dZ[2]), we
              created a tiny cache within the VPU instead of storing them in the
              UB. The rest of the H values will be stored in the UB because
              they&apos;re needed to compute multiple derivatives.
            </p>
            <figure className="mt-12">
              <div className="relative w-full h-66 md:h-100">
                <Image
                  src="/h-cache.svg"
                  alt="H-cache diagram"
                  fill
                  className="object-contain"
                />
              </div>
              <figcaption className="text-sm text-center text-gray-600 mt-2">
                H-cache optimization for storing temporary activation values
              </figcaption>
            </figure>
            <p>
              This is what the new TPU architecture, modified to perform
              training, looks like:
            </p>
            <figure className="mt-12">
              <div className="relative w-full h-66 md:h-130">
                <Image
                  src="/tpu.svg"
                  alt="Complete TPU architecture"
                  fill
                  className="object-contain"
                />
              </div>
              <figcaption className="text-sm text-center text-gray-600 mt-2">
                Complete TPU architecture showing all components for both
                inference and training
              </figcaption>
            </figure>
            <p>Now we can do backpropagation!</p>
            <p>
              Going back to the computational graph, we discovered something
              remarkable: the longest chain in backpropagation closely resembles
              forward pass! In forward pass, we multiply activation matrices
              with transposed weight matrices. In backward pass, we multiply
              gradient matrices with weight matrices (untransposed). It&apos;s
              like looking in a mirror!
            </p>
            <figure className="mt-12">
              <div className="relative w-full h-66 md:h-50">
                <Image
                  src="/forward-pass.svg"
                  alt="Forward pass diagram"
                  fill
                  className="object-contain"
                />
              </div>
              <figcaption className="text-sm text-center text-gray-600 mt-2">
                Forward pass computation flow showing matrix operations
              </figcaption>
            </figure>
            <p>
              This insight led us to compute the long chain of the computational
              graph first (highlighted in yellow) – getting all our dL/dZ[n]
              gradients just like we computed activations in forward pass. We
              could cache these gradients and reuse them, following the same
              efficient pattern we&apos;d already mastered.
            </p>
            <p>We create a loop where we:</p>
            <ol className="list-decimal list-inside mt-2 space-y-2">
              <li>Fetch a bridge node (dL/dZ[n]) from our unified buffer</li>
              <li>
                Fetch the corresponding <InlineMath math={"\\mathbf{H}_n"} />{" "}
                matrix, also from unified buffer
              </li>
              <li>
                Stream these through our systolic array to compute the weight
                gradients
              </li>
            </ol>
            <p>
              And here&apos;s where something really magical happens: we can
              stream these weight gradients directly into a gradient descent
              module while we&apos;re still computing them! This module takes
              the current weights stored in memory and updates them using the
              gradients.
            </p>

            <div className="my-6">
              <p className="text-sm text-gray-700 mb-2">
                The gradient descent update rule:
              </p>
              <div className="text-center mb-4">
                <BlockMath
                  math={
                    "\\bm{\\theta}_{\\text{new}} = \\bm{\\theta}_{\\text{old}} - \\alpha \\nabla_{\\bm{\\theta}} \\mathcal{L}"
                  }
                />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                where <InlineMath math={"\\alpha"} /> is the learning rate and{" "}
                <InlineMath math={"\\bm{\\theta}"} /> represents any parameter
                (weights or biases)
              </p>
            </div>

            <p>
              No waiting around — everything flows like water through our
              pipeline.
            </p>
            <p>
              You might be wondering: &quot;We&apos;ve used our matrix
              multiplication identities for the long chain and weight gradients
              — how do we calculate bias gradients?&quot; Well, we&apos;ve
              actually already done most of the work! Since we&apos;re
              processing batches of data, we can simply sum (the technical term
              is &quot;reduce&quot;) the{" "}
              <InlineMath
                math={"\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{Z}_n}"}
              />{" "}
              gradients across the batch dimension. The beauty is that we can do
              this reduction right when we&apos;re computing the long chain — no
              extra work required!
            </p>
            <p>
              With all these new changes and control flags, our instruction is
              significantly longer — 156 bits in fact! But we can confirm that
              every single one of these bits is needed and we ensured that we
              couldn&apos;t make the instruction set any smaller without
              compromising the speed and efficiency of the TPU.
            </p>
            <figure className="mt-12">
              <div className="relative w-full h-66 md:h-40">
                <Image
                  src="/isa.svg"
                  alt="Instruction Set Architecture diagram"
                  fill
                  className="object-contain"
                />
              </div>
              <figcaption className="text-sm text-center text-gray-600 mt-2">
                156-bit Instruction Set Architecture (ISA) layout showing
                control flags and data fields
              </figcaption>
            </figure>
            <h3>Putting it all together</h3>
            <p>
              By continuing this same process iteratively – forward pass,
              backward pass, weight updates – we can train our network until it
              performs exactly how we want. The same systolic array that powered
              our inference now powers our training, with just a few additional
              modules to handle the gradient computations.
            </p>
            <p>
              What started as a simple idea about matrix multiplication has
              grown into a complete training system. Every component works
              together in harmony: data flows through pipelines, modules operate
              in parallel, and our systolic array stays fed with useful work.
            </p>
            <p>
              This is the essence of what makes TPUs so powerful – they take the
              fundamental operations that neural networks need and implement
              them in the most efficient way possible, keeping all the hardware
              busy and the data flowing smoothly from start to finish.
            </p>
          </div>
        </div>
        <hr className="mt-10 md:mt-16 mb-4 border-neutral-200" />

        <div className="mb-6">
          <p className="font-semibold mb-2">Bias addition (broadcasting):</p>
          <div className="text-center mb-4">
            <BlockMath
              math={"\\mathbf{Z}_{\\text{biased}} = \\mathbf{Z} + \\mathbf{b}"}
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            where bias vector <InlineMath math={"\\mathbf{b}"} /> is broadcast
            across all rows of matrix. This means the bias vector is copied, and
            added to each row of the <InlineMath math={"\\mathbf{Z}"} /> matrix
          </p>
        </div>

        <br></br>
        <h3 className="text-lg md:text-xl font-semibold text-neutral-800 mb-4 mt-8">
          Network architecture
        </h3>

        <div className="mb-6">
          <p className="font-semibold mb-2">Input matrix:</p>
          <div className="text-center mb-6">
            <BlockMath
              math={`
                \\mathbf{X} =
                \\begin{bmatrix}
                \\phantom{.}2\\phantom{.} & \\phantom{.}2\\phantom{.} \\\\[0.3em]
                \\phantom{.}0\\phantom{.} & \\phantom{.}1\\phantom{.} \\\\[0.3em]
                \\phantom{.}1\\phantom{.} & \\phantom{.}0\\phantom{.} \\\\[0.3em]
                \\phantom{.}1\\phantom{.} & \\phantom{.}1\\phantom{.}
                \\end{bmatrix}
                \\in \\mathbb{R}^{4 \\times 2}
              `}
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">Target output vector:</p>
          <div className="text-center mb-6">
            <BlockMath
              math={
                "\\mathbf{y} = \\begin{bmatrix} \\phantom{.}0\\phantom{.} \\\\[0.3em] \\phantom{.}1\\phantom{.} \\\\[0.3em] \\phantom{.}1\\phantom{.} \\\\[0.3em] \\phantom{.}0\\phantom{.} \\end{bmatrix} \\in \\mathbb{R}^{4 \\times 1}"
              }
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">
            Layer 1 weight matrix and bias vector:
          </p>
          <div className="text-center mb-6">
            <BlockMath
              math={
                "\\mathbf{W}_1 = \\begin{bmatrix} \\phantom{-}0.2985\\phantom{0} & -0.5792\\phantom{0} \\\\[0.3em] \\phantom{-}0.0913\\phantom{0} & \\phantom{-}0.4234\\phantom{0} \\end{bmatrix} \\in \\mathbb{R}^{2 \\times 2}, \\quad \\mathbf{b}_1 = \\begin{bmatrix} -0.4939\\phantom{0} & \\phantom{-}0.189\\phantom{00} \\end{bmatrix} \\in \\mathbb{R}^{1 \\times 2}"
              }
            />
          </div>
        </div>

        <div className="mb-8">
          <p className="font-semibold mb-2">
            Layer 2 weight matrix and bias vector:
          </p>
          <div className="text-center mb-8">
            <BlockMath
              math={
                "\\mathbf{W}_2 = \\begin{bmatrix} \\phantom{-}0.5266\\phantom{0} & \\phantom{-}0.2958\\phantom{0} \\end{bmatrix} \\in \\mathbb{R}^{1 \\times 2}, \\quad \\mathbf{b}_2 = \\begin{bmatrix} \\phantom{-}0.6358\\phantom{0} \\end{bmatrix} \\in \\mathbb{R}^{1 \\times 1}"
              }
            />
          </div>
        </div>
        <br></br>
        <h3 className="text-lg md:text-xl font-semibold text-neutral-800 mb-4 mt-8">
          Forward pass with exact values
        </h3>

        <div className="mb-6">
          <p className="font-semibold mb-2">Layer 1 linear transformation:</p>
          <div className="text-center mb-6">
            <BlockMath
              math={
                "\\mathbf{Z}_1 = \\mathbf{X}\\mathbf{W}_1^T = \\begin{bmatrix} \\phantom{.}2\\phantom{.} & \\phantom{.}2\\phantom{.} \\\\[0.3em] \\phantom{.}0\\phantom{.} & \\phantom{.}1\\phantom{.} \\\\[0.3em] \\phantom{.}1\\phantom{.} & \\phantom{.}0\\phantom{.} \\\\[0.3em] \\phantom{.}1\\phantom{.} & \\phantom{.}1\\phantom{.} \\end{bmatrix} \\begin{bmatrix} \\phantom{-}0.2985\\phantom{0} & \\phantom{-}0.0913\\phantom{0} \\\\[0.3em] -0.5792\\phantom{0} & \\phantom{-}0.4234\\phantom{0} \\end{bmatrix} = \\begin{bmatrix} -0.5614\\phantom{0} & \\phantom{-}1.0294\\phantom{0} \\\\[0.3em] -0.5792\\phantom{0} & \\phantom{-}0.4234\\phantom{0} \\\\[0.3em] \\phantom{-}0.2985\\phantom{0} & \\phantom{-}0.0913\\phantom{0} \\\\[0.3em] -0.2807\\phantom{0} & \\phantom{-}0.5147\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">Layer 1 with bias addition:</p>
          <div className="text-center mb-6">
            <BlockMath
              math={
                "\\mathbf{Z}_1 = \\mathbf{Z}_1 + \\mathbf{b}_1 = \\begin{bmatrix} -1.0553\\phantom{0} & \\phantom{-}1.2184\\phantom{0} \\\\[0.3em] -1.0731\\phantom{0} & \\phantom{-}0.6124\\phantom{0} \\\\[0.3em] -0.1954\\phantom{0} & \\phantom{-}0.2803\\phantom{0} \\\\[0.3em] -0.7746\\phantom{0} & \\phantom{-}0.7037\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">
            Layer 1 activation (element-wise application):
          </p>
          <div className="text-center mb-4">
            <BlockMath
              math={"\\mathbf{H}_1 = \\text{LeakyReLU}_{0.5}(\\mathbf{Z}_1)"}
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            This applies LeakyReLU to each element of the matrix:
          </p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\mathbf{H}_1 = \\begin{bmatrix} \\text{LeakyReLU}_{0.5}(-1.0553) & \\text{LeakyReLU}_{0.5}(1.2184) \\\\[0.3em] \\text{LeakyReLU}_{0.5}(-1.0731) & \\text{LeakyReLU}_{0.5}(0.6124) \\\\[0.3em] \\text{LeakyReLU}_{0.5}(-0.1954) & \\text{LeakyReLU}_{0.5}(0.2803) \\\\[0.3em] \\text{LeakyReLU}_{0.5}(-0.7746) & \\text{LeakyReLU}_{0.5}(0.7037) \\end{bmatrix}"
              }
            />
          </div>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "= \\begin{bmatrix} 0.5 \\times (-1.0553) & 1.2184 \\\\[0.3em] 0.5 \\times (-1.0731) & 0.6124 \\\\[0.3em] 0.5 \\times (-0.1954) & 0.2803 \\\\[0.3em] 0.5 \\times (-0.7746) & 0.7037 \\end{bmatrix}"
              }
            />
          </div>
          <div className="text-center mb-6">
            <BlockMath
              math={
                "= \\begin{bmatrix} -0.5277\\phantom{0} & \\phantom{-}1.2184\\phantom{0} \\\\[0.3em] -0.5366\\phantom{0} & \\phantom{-}0.6124\\phantom{0} \\\\[0.3em] -0.0977\\phantom{0} & \\phantom{-}0.2803\\phantom{0} \\\\[0.3em] -0.3873\\phantom{0} & \\phantom{-}0.7037\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">Layer 2 linear transformation:</p>
          <div className="text-center mb-6">
            <BlockMath
              math={
                "\\mathbf{z}_2 = \\mathbf{H}_1\\mathbf{W}_2^T = \\begin{bmatrix} -0.5277\\phantom{0} & \\phantom{-}1.2184\\phantom{0} \\\\[0.3em] -0.5366\\phantom{0} & \\phantom{-}0.6124\\phantom{0} \\\\[0.3em] -0.0977\\phantom{0} & \\phantom{-}0.2803\\phantom{0} \\\\[0.3em] -0.3873\\phantom{0} & \\phantom{-}0.7037\\phantom{0} \\end{bmatrix} \\begin{bmatrix} \\phantom{-}0.5266\\phantom{0} \\\\[0.3em] \\phantom{-}0.2958\\phantom{0} \\end{bmatrix} = \\begin{bmatrix} \\phantom{-}0.0825\\phantom{0} \\\\[0.3em] -0.1014\\phantom{0} \\\\[0.3em] \\phantom{-}0.0315\\phantom{0} \\\\[0.3em] \\phantom{-}0.0042\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">Layer 2 with bias addition:</p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\mathbf{z}_2 = \\mathbf{z}_2 + \\mathbf{b}_2 = \\begin{bmatrix} \\phantom{-}0.0825\\phantom{0} \\\\[0.3em] -0.1014\\phantom{0} \\\\[0.3em] \\phantom{-}0.0315\\phantom{0} \\\\[0.3em] \\phantom{-}0.0042\\phantom{0} \\end{bmatrix} + \\begin{bmatrix} \\phantom{-}0.6358\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
          <div className="text-center mb-6">
            <BlockMath
              math={
                "= \\begin{bmatrix} \\phantom{-}0.0825 + 0.6358\\phantom{0} \\\\[0.3em] -0.1014 + 0.6358\\phantom{0} \\\\[0.3em] \\phantom{-}0.0315 + 0.6358\\phantom{0} \\\\[0.3em] \\phantom{-}0.0042 + 0.6358\\phantom{0} \\end{bmatrix} = \\begin{bmatrix} \\phantom{-}0.7183\\phantom{0} \\\\[0.3em] \\phantom{-}0.5344\\phantom{0} \\\\[0.3em] \\phantom{-}0.6673\\phantom{0} \\\\[0.3em] \\phantom{-}0.6400\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">
            Output vector (element-wise activation):
          </p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\hat{\\mathbf{y}} = \\mathbf{h}_2 = \\text{LeakyReLU}_{0.5}(\\mathbf{z}_2) = \\begin{bmatrix} \\phantom{-}0.7183\\phantom{0} \\\\[0.3em] \\phantom{-}0.5344\\phantom{0} \\\\[0.3em] \\phantom{-}0.6673\\phantom{0} \\\\[0.3em] \\phantom{-}0.6400\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            (All elements are positive, so they pass through unchanged)
          </p>
        </div>

        <div className="mb-8">
          <p className="font-semibold mb-2">Scalar loss:</p>
          <div className="text-center mb-8">
            <BlockMath
              math={
                "\\mathcal{L} = \\frac{1}{4}\\sum_{i=1}^{4}(y_i - \\hat{y}_i)^2 = 0.3133"
              }
            />
          </div>
        </div>
        <br></br>
        <h3 className="text-lg md:text-xl font-semibold text-neutral-800 mb-4 mt-8">
          Backward pass with exact values
        </h3>

        <div className="mb-6">
          <p className="font-semibold mb-2">
            Output layer gradient vector (element-wise subtraction):
          </p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{h}_2} = \\frac{2}{N}(\\mathbf{h}_2 - \\mathbf{y})"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            First, compute the element-wise difference:
          </p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\mathbf{h}_2 - \\mathbf{y} = \\begin{bmatrix} \\phantom{-}0.7183\\phantom{0} \\\\[0.3em] \\phantom{-}0.5344\\phantom{0} \\\\[0.3em] \\phantom{-}0.6673\\phantom{0} \\\\[0.3em] \\phantom{-}0.6400\\phantom{0} \\end{bmatrix} - \\begin{bmatrix} \\phantom{.}0\\phantom{.} \\\\[0.3em] \\phantom{.}1\\phantom{.} \\\\[0.3em] \\phantom{.}1\\phantom{.} \\\\[0.3em] \\phantom{.}0\\phantom{.} \\end{bmatrix} = \\begin{bmatrix} 0.7183 - 0\\phantom{0} \\\\[0.3em] 0.5344 - 1\\phantom{0} \\\\[0.3em] 0.6673 - 1\\phantom{0} \\\\[0.3em] 0.6400 - 0\\phantom{0} \\end{bmatrix} = \\begin{bmatrix} \\phantom{-}0.7183\\phantom{0} \\\\[0.3em] -0.4656\\phantom{0} \\\\[0.3em] -0.3327\\phantom{0} \\\\[0.3em] \\phantom{-}0.6400\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            Then scale by{" "}
            <InlineMath math={"\\frac{2}{N} = \\frac{2}{4} = \\frac{1}{2}"} />{" "}
            (scalar multiplication is element-wise):
          </p>
          <div className="text-center mb-6">
            <BlockMath
              math={
                "\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{h}_2} = \\frac{1}{2} \\begin{bmatrix} \\phantom{-}0.7183\\phantom{0} \\\\[0.3em] -0.4656\\phantom{0} \\\\[0.3em] -0.3327\\phantom{0} \\\\[0.3em] \\phantom{-}0.6400\\phantom{0} \\end{bmatrix} = \\begin{bmatrix} \\phantom{-}0.3592\\phantom{0} \\\\[0.3em] -0.2328\\phantom{0} \\\\[0.3em] -0.1664\\phantom{0} \\\\[0.3em] \\phantom{-}0.3200\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">
            Pre-activation gradient layer 2 (hadamard product):
          </p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{z}_2} = \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{h}_2} \\odot \\frac{\\partial \\text{LeakyReLU}_{0.5}(\\mathbf{z}_2)}{\\partial \\mathbf{z}_2}"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            First, compute the LeakyReLU gradient for each element of{" "}
            <InlineMath math={"\\mathbf{z}_2"} />:
          </p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\frac{\\partial \\text{LeakyReLU}_{0.5}(\\mathbf{z}_2)}{\\partial \\mathbf{z}_2} = \\begin{bmatrix} \\phantom{-}1 \\text{ (since } 0.7183 > 0)\\phantom{0} \\\\[0.3em] \\phantom{-}1 \\text{ (since } 0.5344 > 0)\\phantom{0} \\\\[0.3em] \\phantom{-}1 \\text{ (since } 0.6673 > 0)\\phantom{0} \\\\[0.3em] \\phantom{-}1 \\text{ (since } 0.6400 > 0)\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            Then compute the Hadamard (element-wise) product:
          </p>
          <div className="text-center mb-6">
            <BlockMath
              math={
                "\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{z}_2} = \\begin{bmatrix} \\phantom{-}0.3592\\phantom{0} \\\\[0.3em] -0.2328\\phantom{0} \\\\[0.3em] -0.1664\\phantom{0} \\\\[0.3em] \\phantom{-}0.3200\\phantom{0} \\end{bmatrix} \\odot \\begin{bmatrix} \\phantom{.}1\\phantom{.} \\\\[0.3em] \\phantom{.}1\\phantom{.} \\\\[0.3em] \\phantom{.}1\\phantom{.} \\\\[0.3em] \\phantom{.}1\\phantom{.} \\end{bmatrix} = \\begin{bmatrix} 0.3592 \\times 1\\phantom{0} \\\\[0.3em] -0.2328 \\times 1\\phantom{.} \\\\[0.3em] -0.1664 \\times 1\\phantom{.} \\\\[0.3em] 0.3200 \\times 1\\phantom{0} \\end{bmatrix} = \\begin{bmatrix} \\phantom{-}0.3592\\phantom{0} \\\\[0.3em] -0.2328\\phantom{0} \\\\[0.3em] -0.1664\\phantom{0} \\\\[0.3em] \\phantom{-}0.3200\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">Hidden layer gradient matrix:</p>
          <div className="text-center mb-6">
            <BlockMath
              math={
                "\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{H}_1} = \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{z}_2} \\mathbf{W}_2 = \\begin{bmatrix} \\phantom{-}0.3592\\phantom{0} \\\\[0.5em] -0.2328\\phantom{0} \\\\[0.5em] -0.1664\\phantom{0} \\\\[0.5em] \\phantom{-}0.3200\\phantom{0} \\end{bmatrix} \\begin{bmatrix} \\phantom{-}0.5266\\phantom{0} & \\phantom{-}0.2958\\phantom{0} \\end{bmatrix} = \\begin{bmatrix} \\phantom{-}0.1891\\phantom{0} & \\phantom{-}0.1062\\phantom{0} \\\\[0.5em] -0.1226\\phantom{0} & -0.0689\\phantom{0} \\\\[0.5em] -0.0876\\phantom{0} & -0.0492\\phantom{0} \\\\[0.5em] \\phantom{-}0.1685\\phantom{0} & \\phantom{-}0.0947\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">
            Pre-activation gradient layer 1 matrix (hadamard product):
          </p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{Z}_1} = \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{H}_1} \\odot \\frac{\\partial \\text{LeakyReLU}_{0.5}(\\mathbf{Z}_1)}{\\partial \\mathbf{Z}_1}"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            First, compute the LeakyReLU gradient for{" "}
            <InlineMath math={"\\mathbf{Z}_1"} />:
          </p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\frac{\\partial \\text{LeakyReLU}_{0.5}(\\mathbf{Z}_1)}{\\partial \\mathbf{Z}_1} = \\begin{bmatrix} \\phantom{.}0.5 \\text{ (since } -1.0553 \\leq 0)\\phantom{.0} & \\phantom{.}1 \\text{ (since } 1.2184 > 0)\\phantom{.} \\\\[0.5em] \\phantom{.}0.5 \\text{ (since } -1.0731 \\leq 0)\\phantom{.0} & \\phantom{.}1 \\text{ (since } 0.6124 > 0)\\phantom{.} \\\\[0.5em] \\phantom{.}0.5 \\text{ (since } -0.1954 \\leq 0)\\phantom{.0} & \\phantom{.}1 \\text{ (since } 0.2803 > 0)\\phantom{.} \\\\[0.5em] \\phantom{.}0.5 \\text{ (since } -0.7746 \\leq 0)\\phantom{.0} & \\phantom{.}1 \\text{ (since } 0.7037 > 0)\\phantom{.} \\end{bmatrix}"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            Then compute the Hadamard product:
          </p>
          <div className="text-center mb-8">
            <BlockMath
              math={
                "\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{Z}_1} = \\begin{bmatrix} \\phantom{-}0.1891\\phantom{0} & \\phantom{-}0.1062\\phantom{0} \\\\[0.5em] -0.1226\\phantom{0} & -0.0689\\phantom{0} \\\\[0.5em] -0.0876\\phantom{0} & -0.0492\\phantom{0} \\\\[0.5em] \\phantom{-}0.1685\\phantom{0} & \\phantom{-}0.0947\\phantom{0} \\end{bmatrix} \\odot \\begin{bmatrix} \\phantom{.}0.5\\phantom{.0} & \\phantom{.}1\\phantom{.} \\\\[0.5em] \\phantom{.}0.5\\phantom{.0} & \\phantom{.}1\\phantom{.} \\\\[0.5em] \\phantom{.}0.5\\phantom{.0} & \\phantom{.}1\\phantom{.} \\\\[0.5em] \\phantom{.}0.5\\phantom{.0} & \\phantom{.}1\\phantom{.} \\end{bmatrix} = \\begin{bmatrix} \\phantom{-}0.0946\\phantom{0} & \\phantom{-}0.1062\\phantom{0} \\\\[0.5em] -0.0613\\phantom{0} & -0.0689\\phantom{0} \\\\[0.5em] -0.0438\\phantom{0} & -0.0492\\phantom{0} \\\\[0.5em] \\phantom{-}0.0843\\phantom{0} & \\phantom{-}0.0947\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
        </div>
        <br></br>
        <h3 className="text-lg md:text-xl font-semibold text-neutral-800 mb-4 mt-8">
          Weight gradients
        </h3>

        <div className="mb-6">
          <p className="font-semibold mb-2">Layer 2 weight gradient matrix:</p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{W}_2} = \\left(\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{z}_2}\\right)^T \\mathbf{H}_1"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            First transpose the gradient vector:
          </p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\left(\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{z}_2}\\right)^T = \\begin{bmatrix} \\phantom{-}0.3592\\phantom{0} & -0.2328\\phantom{0} & -0.1664\\phantom{0} & \\phantom{-}0.3200\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            Then multiply:
          </p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{W}_2} = \\begin{bmatrix} \\phantom{-}0.3592\\phantom{0} & -0.2328\\phantom{0} & -0.1664\\phantom{0} & \\phantom{-}0.3200\\phantom{0} \\end{bmatrix} \\begin{bmatrix} -0.5277\\phantom{0} & \\phantom{-}1.2184\\phantom{0} \\\\[0.5em] -0.5366\\phantom{0} & \\phantom{-}0.6124\\phantom{0} \\\\[0.5em] -0.0977\\phantom{0} & \\phantom{-}0.2803\\phantom{0} \\\\[0.5em] -0.3873\\phantom{0} & \\phantom{-}0.7037\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
          <div className="text-center mb-6">
            <BlockMath
              math={
                "= \\begin{bmatrix} -0.1723\\phantom{0} & \\phantom{-}0.4736\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">
            Layer 2 bias gradient (sum over samples):
          </p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{b}_2} = \\sum_{i=1}^{N} \\frac{\\partial \\mathcal{L}}{\\partial z_2^{(i)}}"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            Sum all elements of the gradient vector:
          </p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{b}_2} = 0.3592 + (-0.2328) + (-0.1664) + 0.3200 = 0.2800"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            As a 1×1 vector:
          </p>
          <div className="text-center mb-6">
            <BlockMath
              math={
                "\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{b}_2} = \\begin{bmatrix} \\phantom{-}0.2800\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">Layer 1 weight gradient matrix:</p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{W}_1} = \\left(\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{Z}_1}\\right)^T \\mathbf{X}"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            First transpose the gradient matrix:
          </p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\left(\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{Z}_1}\\right)^T = \\begin{bmatrix} \\phantom{-}0.0946\\phantom{0} & -0.0613\\phantom{0} & -0.0438\\phantom{0} & \\phantom{-}0.0843\\phantom{0} \\\\[0.5em] \\phantom{-}0.1062\\phantom{0} & -0.0689\\phantom{0} & -0.0492\\phantom{0} & \\phantom{-}0.0947\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            Then multiply:
          </p>
          <div className="text-center mb-6">
            <BlockMath
              math={
                "\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{W}_1} = \\begin{bmatrix} \\phantom{-}0.0946\\phantom{0} & -0.0613\\phantom{0} & -0.0438\\phantom{0} & \\phantom{-}0.0843\\phantom{0} \\\\[0.5em] \\phantom{-}0.1062\\phantom{0} & -0.0689\\phantom{0} & -0.0492\\phantom{0} & \\phantom{-}0.0947\\phantom{0} \\end{bmatrix} \\begin{bmatrix} \\phantom{.}2\\phantom{.} & \\phantom{.}2\\phantom{.} \\\\[0.5em] \\phantom{.}0\\phantom{.} & \\phantom{.}1\\phantom{.} \\\\[0.5em] \\phantom{.}1\\phantom{.} & \\phantom{.}0\\phantom{.} \\\\[0.5em] \\phantom{.}1\\phantom{.} & \\phantom{.}1\\phantom{.} \\end{bmatrix} = \\begin{bmatrix} \\phantom{-}0.2296\\phantom{0} & \\phantom{-}0.2121\\phantom{0} \\\\[0.5em] \\phantom{-}0.2579\\phantom{0} & \\phantom{-}0.2383\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
        </div>

        <div className="mb-8">
          <p className="font-semibold mb-2">
            Layer 1 bias gradient vector (sum over samples):
          </p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{b}_1} = \\sum_{i=1}^{N} \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{Z}_1^{(i)}}"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            Sum each column across all rows:
          </p>
          <div className="text-center mb-8">
            <BlockMath
              math={
                "\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{b}_1} = \\begin{bmatrix} 0.0946 + (-0.0613) + (-0.0438) + 0.0843 \\\\[0.5em] 0.1062 + (-0.0689) + (-0.0492) + 0.0947 \\end{bmatrix}^T = \\begin{bmatrix} \\phantom{-}0.0737\\phantom{0} & \\phantom{-}0.0828\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
        </div>

        <br></br>

        <h3 className="text-lg md:text-xl font-semibold text-neutral-800 mb-4 mt-8">
          Weight updates (gradient descent)
        </h3>

        <div className="mb-6">
          <p className="font-semibold mb-2">
            Learning rate (scalar): <InlineMath math={"\\alpha = 0.75"} />
          </p>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">Layer 1 weight matrix update:</p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\mathbf{W}_1^{\\text{new}} = \\mathbf{W}_1 - \\alpha \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{W}_1}"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            First compute the scaled gradient (scalar multiplication is
            element-wise):
          </p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\alpha \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{W}_1} = 0.75 \\times \\begin{bmatrix} \\phantom{-}0.2296\\phantom{0} & \\phantom{-}0.2121\\phantom{0} \\\\[0.5em] \\phantom{-}0.2579\\phantom{0} & \\phantom{-}0.2383\\phantom{0} \\end{bmatrix} = \\begin{bmatrix} \\phantom{-}0.1722\\phantom{0} & \\phantom{-}0.1591\\phantom{0} \\\\[0.5em] \\phantom{-}0.1934\\phantom{0} & \\phantom{-}0.1787\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            Then subtract element-wise:
          </p>
          <div className="text-center mb-6">
            <BlockMath
              math={
                "\\mathbf{W}_1^{\\text{new}} = \\begin{bmatrix} \\phantom{-}0.2985\\phantom{0} & -0.5792\\phantom{0} \\\\[0.3em] \\phantom{-}0.0913\\phantom{0} & \\phantom{-}0.4234\\phantom{0} \\end{bmatrix} - \\begin{bmatrix} \\phantom{-}0.1722\\phantom{0} & \\phantom{-}0.1591\\phantom{0} \\\\[0.3em] \\phantom{-}0.1934\\phantom{0} & \\phantom{-}0.1787\\phantom{0} \\end{bmatrix} = \\begin{bmatrix} \\phantom{-}0.1263\\phantom{0} & -0.7383\\phantom{0} \\\\[0.3em] -0.1021\\phantom{0} & \\phantom{-}0.2447\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">Layer 1 bias vector update:</p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\mathbf{b}_1^{\\text{new}} = \\mathbf{b}_1 - \\alpha \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{b}_1}"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            First compute the scaled gradient (scalar multiplication is
            element-wise):
          </p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\alpha \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{b}_1} = 0.75 \\times \\begin{bmatrix} \\phantom{-}0.0737\\phantom{0} & \\phantom{-}0.0828\\phantom{0} \\end{bmatrix} = \\begin{bmatrix} \\phantom{-}0.0553\\phantom{0} & \\phantom{-}0.0621\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            Then subtract element-wise:
          </p>
          <div className="text-center mb-6">
            <BlockMath
              math={
                "\\mathbf{b}_1^{\\text{new}} = \\begin{bmatrix} -0.4939\\phantom{0} & \\phantom{-}0.1890\\phantom{0} \\end{bmatrix} - \\begin{bmatrix} \\phantom{-}0.0553\\phantom{0} & \\phantom{-}0.0621\\phantom{0} \\end{bmatrix} = \\begin{bmatrix} -0.5492\\phantom{0} & \\phantom{-}0.1269\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">Layer 2 weight matrix update:</p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\mathbf{W}_2^{\\text{new}} = \\mathbf{W}_2 - \\alpha \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{W}_2}"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            First compute the scaled gradient (scalar multiplication is
            element-wise):
          </p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\alpha \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{W}_2} = 0.75 \\times \\begin{bmatrix} -0.1723\\phantom{0} & \\phantom{-}0.4736\\phantom{0} \\end{bmatrix} = \\begin{bmatrix} -0.1292\\phantom{0} & \\phantom{-}0.3552\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            Then subtract element-wise:
          </p>
          <div className="text-center mb-6">
            <BlockMath
              math={
                "\\mathbf{W}_2^{\\text{new}} = \\begin{bmatrix} \\phantom{-}0.5266\\phantom{0} & \\phantom{-}0.2958\\phantom{0} \\end{bmatrix} - \\begin{bmatrix} -0.1292\\phantom{0} & \\phantom{-}0.3552\\phantom{0} \\end{bmatrix} = \\begin{bmatrix} \\phantom{-}0.6558\\phantom{0} & -0.0594\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
        </div>

        <div className="mb-8">
          <p className="font-semibold mb-2">Layer 2 bias vector update:</p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\mathbf{b}_2^{\\text{new}} = \\mathbf{b}_2 - \\alpha \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{b}_2}"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            First compute the scaled gradient (scalar multiplication):
          </p>
          <div className="text-center mb-4">
            <BlockMath
              math={
                "\\alpha \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{b}_2} = 0.75 \\times \\begin{bmatrix} \\phantom{-}0.2800\\phantom{0} \\end{bmatrix} = \\begin{bmatrix} \\phantom{-}0.2100\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            Then subtract:
          </p>
          <div className="text-center mb-8">
            <BlockMath
              math={
                "\\mathbf{b}_2^{\\text{new}} = \\begin{bmatrix} \\phantom{-}0.6358\\phantom{0} \\end{bmatrix} - \\begin{bmatrix} \\phantom{-}0.2100\\phantom{0} \\end{bmatrix} = \\begin{bmatrix} \\phantom{-}0.4258\\phantom{0} \\end{bmatrix}"
              }
            />
          </div>
        </div>
        <br></br>
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
