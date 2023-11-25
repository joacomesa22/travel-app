import { audiowide } from "@/assets/fonts";
export default function Home() {
  return (
    <>
      <section className="h-screen flex flex-col justify-center items-center">
        <div className="max-w-[1000px] text-center flex flex-col justify-center items-center gap-3">
          <p className="text-4xl">Welcome to</p>
          <h1 className={`${audiowide.className} text-9xl`}>Travel API Kit</h1>
          <p className="text-xl max-w-[600px] mb-4">
            Pocket Guide for travelers
          </p>
        </div>
      </section>
    </>
  );
}
