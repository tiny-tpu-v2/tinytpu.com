export default function Home() {
  return (
    <main className="min-h-screen flex justify-center items-start p-6 pt-12 md:pt-28">
      <div className="max-w-3xl text-lg leading-8 text-left">
        <h1 className="text-4xl md:text-5xl leading-tight mb-3">
          Tiny-TPU: the why and how
        </h1>
        <p className="text-sm text-neutral-600 mb-8">
          Aug 17th 2025 · Xander Chin, Kenny Guo, Evan Lin, Surya Sure
        </p>
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
        </p>
      </div>
    </main>
  );
}
