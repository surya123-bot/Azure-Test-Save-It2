import Footer from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex flex-col min-h-screen items-center justify-center p-24 gap-y-10 text-[2.5rem] md:text-[3rem] lg:text-[4.5rem]">
        <div className="flex flex-col justify-centre place-items-center z-[-1] ">
          <code className="font-mono font-bold">
            Save It!
            <br />
            <span className="text-[1.5rem] md:text-[2rem] lg:text-[3rem]">
              Created By: &quot;Harsh Patel&quot;
            </span>
          </code>
          <Separator />
        </div>
        <div className="flex justify-between gap-y-5">
          <Link
            href="/posts/text"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Browse{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Check Out the latest Posts and Save it for later.
            </p>
          </Link>

          <Link
            href="/saved"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Saved Posts{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
              Check Your Saved Posts here.
            </p>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
