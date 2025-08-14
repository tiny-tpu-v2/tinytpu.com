import { Roboto_Mono } from "next/font/google";

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
    <main className="min-h-screen flex justify-center items-start p-6 pt-12 md:pt-28">
      <div className="max-w-3xl text-lg leading-8 text-left">
        <h1 className="text-4xl md:text-5xl leading-tight mb-3">
          Tiny-TPU: the why and how
        </h1>
        <div className="space-x-4">
          <p className="text-sm text-neutral-600 mb-8">
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
        </div>
        <p>
          Nobody really understands how TPUs work…and neither do we! So we
          wanted to make this because we wanted to take a shot and try to guess
          how it works–from the perspective of complete novices!
        </p>
        <br />
        <p>Why did we start this project?</p>
        <br />
        <p>
          We wanted to do something very challenging (maybe even olympic level)
          to prove to ourselves that we can do anything we put our mind to. The
          reasoning for why we chose to build a TPU specifically is fairly
          simple:
        </p>
        <ul className="list-disc list-inside text-left mt-4">
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
          <sup className="ml-1 text-[10px]">
            <a
              href="#fn1"
              className="no-underline text-purple-400 hover:text-purple-600"
            >
              [1]
            </a>
          </sup>
        </p>

        <div className="mt-16 w-full">
          <pre
            className={`${robotoMono.className} border border-black rounded-md bg-white p-4 text-sm md:text-base overflow-x-auto`}
          >
            <code
              dangerouslySetInnerHTML={{
                __html: highlightVerilog(verilogSnippet),
              }}
            />
          </pre>
        </div>

        <div className="mt-8">
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
        </div>
        <hr className="mt-16 mb-4 border-neutral-200" />
        <h2 className="text-xs uppercase tracking-wide text-neutral-500">
          Footnotes
        </h2>
        <p id="fn1" className="text-sm text-neutral-700 mt-2">
          [1] we firmly believe in &quot;how you do anything is how you do
          everything&quot;
        </p>

        <footer className="mt-10">
          <ul className="space-y-2">
            <li className="flex items-center gap-3 text-sm">
              <span className="text-neutral-800">Xander Chin</span>
              <div className="flex items-center gap-2">
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
                    className="h-4 w-4"
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
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v10.5A2.75 2.75 0 0 1 19.25 20H4.75A2.75 2.75 0 0 1 2 17.25V6.75zm1.5 0v.2l8.3 5.18 8.2-5.18v-.2A1.25 1.25 0 0 0 19.25 5.5H4.75A1.25 1.25 0 0 0 3.5 6.75zm17 2.03-7.56 4.77a2.25 2.25 0 0 1-2.38 0L3.5 8.78v8.47c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V8.78z" />
                  </svg>
                </a>
              </div>
            </li>

            <li className="flex items-center gap-3 text-sm">
              <span className="text-neutral-800">Surya Sure</span>
              <div className="flex items-center gap-2">
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
                    className="h-4 w-4"
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
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v10.5A2.75 2.75 0 0 1 19.25 20H4.75A2.75 2.75 0 0 1 2 17.25V6.75zm1.5 0v.2l8.3 5.18 8.2-5.18v-.2A1.25 1.25 0 0 0 19.25 5.5H4.75A1.25 1.25 0 0 0 3.5 6.75zm17 2.03-7.56 4.77a2.25 2.25 0 0 1-2.38 0L3.5 8.78v8.47c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V8.78z" />
                  </svg>
                </a>
              </div>
            </li>

            <li className="flex items-center gap-3 text-sm">
              <span className="text-neutral-800">Evan Lin</span>
              <div className="flex items-center gap-2">
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
                    className="h-4 w-4"
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
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v10.5A2.75 2.75 0 0 1 19.25 20H4.75A2.75 2.75 0 0 1 2 17.25V6.75zm1.5 0v.2l8.3 5.18 8.2-5.18v-.2A1.25 1.25 0 0 0 19.25 5.5H4.75A1.25 1.25 0 0 0 3.5 6.75zm17 2.03-7.56 4.77a2.25 2.25 0 0 1-2.38 0L3.5 8.78v8.47c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V8.78z" />
                  </svg>
                </a>
              </div>
            </li>

            <li className="flex items-center gap-3 text-sm">
              <span className="text-neutral-800">Kenny Guo</span>
              <div className="flex items-center gap-2">
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
                    className="h-4 w-4"
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
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v10.5A2.75 2.75 0 0 1 19.25 20H4.75A2.75 2.75 0 0 1 2 17.25V6.75zm1.5 0v.2l8.3 5.18 8.2-5.18v-.2A1.25 1.25 0 0 0 19.25 5.5H4.75A1.25 1.25 0 0 0 3.5 6.75zm17 2.03-7.56 4.77a2.25 2.25 0 0 1-2.38 0L3.5 8.78v8.47c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V8.78z" />
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
