import Image from "next/image";
import { Button } from "@/components/ui/button";
import { onBoardUser } from "@/modules/auth/actions";
import {
  Code,
  Code2Icon,
  Icon,
  LightbulbIcon,
  Trophy,
  Users2,
} from "lucide-react";

export default async function Home() {
  await onBoardUser();
  return (
    <>
      <section className="mt-30 mb-24 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <p className="border bg-amber-900 text-yellow-400 p-1 text-xs rounded-lg px-3 mb-3">
            Join 10,000+ developers already coding
          </p>

          <h1 className="scroll-m-20 leading-29 my-3 text-center line text-7xl font-extrabold tracking-tight text-balance text-gray-900 dark:text-white">
            Master
            <span className="relative before:absolute before:w-full before:h-full m-2 before:rotate-179 before:bg-amber-400 before:rounded-md">
              <span className="text-white dark:text-black relative p-2">
                Problem
              </span>
            </span>
            Solving <br /> with{" "}
            <span className="relative before:absolute before:w-full before:h-full m-2 before:rotate-181 before:bg-violet-500 before:rounded-md">
              <span className="text-white dark:text-white relative p-2">
                Code
              </span>
            </span>
          </h1>

          <p className="leading-9 text-center font-light text-2xl text-gray-700 dark:text-gray-300">
            Challenge yourself with thousands of coding problems, compete with
            developers worldwide and accelerate your programming with real time
            feedback and expert solutions.
          </p>

          <div className="flex gap-2 py-6">
            <Button
              variant="secondary"
              className="bg-amber-400 text-white dark:text-black px-4 py-5 mr-2 cursor-pointer"
            >
              <Code /> Start Coding now
            </Button>

            <Button
              variant="outline"
              className="border border-violet-500 text-gray-900 dark:text-violet-300 px-4 py-5 cursor-pointer"
            >
              Browse problems
            </Button>
          </div>

          <div className="grid grid-cols-4 w-full py-6">
            <div className="text-center">
              <h3 className="text-4xl text-gray-900 dark:text-white">50k+</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Problems solved
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-4xl text-gray-900 dark:text-white">10k+</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Active developers
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-4xl text-gray-900 dark:text-white">25+</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Programming languages
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-4xl text-gray-900 dark:text-white">98%</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Success Rate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-100 dark:bg-mist-950 py-16 mt-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4 pb-2">
            Everything you need to <span className="text-amber-400">excel</span>
          </h2>

          <p className="text-center text-md text-gray-600 dark:text-gray-300 mb-4">
            We provide a vast collection of coding problems across various
            difficulty levels and programming languages. Our platform offers
            real-time feedback.
          </p>

          <div className="grid grid-cols-4 w-full py-6 gap-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg bg-white dark:bg-gray-800">
              <span className="bg-amber-900 inline-block p-2 rounded-md mb-2">
                <Code2Icon />
              </span>
              <h3 className="text-md pb-2 text-gray-900 dark:text-white">
                Interactive coding
              </h3>
              <p className="text-sm text-left text-gray-500 dark:text-gray-400">
                practice with real-time feedback
              </p>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg bg-white dark:bg-gray-800">
              <span className="bg-violet-500 inline-block p-2 rounded-md mb-2">
                <Trophy />
              </span>
              <h3 className="text-md pb-2 text-gray-900 dark:text-white">
                Track in progress
              </h3>
              <p className="text-sm text-left text-gray-500 dark:text-gray-400">
                monitor your progress and identify areas for improvement
              </p>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg bg-white dark:bg-gray-800">
              <span className="bg-amber-900 inline-block p-2 rounded-md mb-2">
                <Users2 />
              </span>
              <h3 className="text-md pb-2 text-gray-900 dark:text-white">
                Global Community
              </h3>
              <p className="text-sm text-left text-gray-500 dark:text-gray-400">
                Learn and grow with a vibrant community of developers worldwide
              </p>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg bg-white dark:bg-gray-800">
              <span className="bg-violet-500 inline-block p-2 rounded-md mb-2">
                <LightbulbIcon />
              </span>
              <h3 className="text-md pb-2 text-gray-900 dark:text-white">
                Expert solutions
              </h3>
              <p className="text-sm text-left text-gray-500 dark:text-gray-400">
                Get instant feedback on your solutions with detailed
                explanations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Difficulty */}
      <section className="bg-gray-200 dark:bg-black py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4 pb-2">
            Choose your <span className="text-violet-500">challenge</span>
          </h2>

          <p className="text-center text-md text-gray-600 dark:text-gray-300 mb-4">
            From beginner friendly puzzles to advanced algorithms challenges.
          </p>

          <div className="grid grid-cols-3 w-full py-6 gap-6">
            <div className="p-5 border border-amber-900 shadow-sm rounded-lg bg-white dark:bg-gray-900">
              <span className="border bg-amber-900 text-yellow-400 p-1 text-xs rounded-lg px-3">
                Easy
              </span>
              <h3 className="text-md pt-2 pb-2 text-gray-900 dark:text-white">
                Easy problems
              </h3>
              <p className="text-sm text-left text-gray-500 dark:text-gray-400">
                practice with real-time feedback
              </p>
              <p className="text-amber-600 dark:text-amber-400 pt-3">
                500+ problems
              </p>
            </div>

            <div className="p-5 border border-violet-500 shadow-sm rounded-lg bg-white dark:bg-gray-900">
              <span className="border bg-violet-900 text-violet-400 p-1 text-xs rounded-lg px-3">
                Medium
              </span>
              <h3 className="text-md pt-2 pb-2 text-gray-900 dark:text-white">
                Medium problems
              </h3>
              <p className="text-sm text-left text-gray-500 dark:text-gray-400">
                practice with real-time feedback
              </p>
              <p className="text-violet-600 dark:text-violet-400 pt-3">
                400+ problems
              </p>
            </div>

            <div className="p-5 border border-amber-900 shadow-sm rounded-lg bg-white dark:bg-gray-900">
              <span className="border bg-amber-900 text-yellow-400 p-1 text-xs rounded-lg px-3">
                Hard
              </span>
              <h3 className="text-md pt-2 pb-2 text-gray-900 dark:text-white">
                Hard problems
              </h3>
              <p className="text-sm text-left text-gray-500 dark:text-gray-400">
                practice with real-time feedback
              </p>
              <p className="text-amber-600 dark:text-amber-400 pt-3">
                200+ problems
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient CTA Section */}
      <section className="py-26 text-center bg-linear-to-t from-violet-300 via-orange-400 to-violet-500 dark:from-gray-300 dark:via-gray-400 dark:to-gray-500">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4 pb-2">
            Ready to start your coding journey?
          </h2>

          <p className="text-lg text-white/90 mb-8">
            Join thousands of developers who are improving their skills every
            day
          </p>

          <Button
            variant="secondary"
            className="bg-white text-black hover:bg-gray-100 dark:bg-black dark:text-white dark:hover:bg-gray-900 px-4 py-5 mr-2 cursor-pointer"
          >
            <Code /> Get started for free
          </Button>
        </div>
      </section>
    </>
  );
}
