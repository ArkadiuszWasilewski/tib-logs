import { Link } from "react-router-dom";
import instructionGif from '@/assets/export_instruction.gif'

const AboutPage = () => {
  return (
    <section className="flex flex-col items-center px-6 py-8 mb-10 mx-auto lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-4xl xl:p-10 dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome to Tibia Logs!
          </h1>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This guide will help you get familiar with the website, how to start logging hunting sessions, and how to upload your logs. The process is straightforward, but make sure you follow every step.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Account Setup
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To upload logs to the site, you will need to create an account.
              After signing up, you can manage your available characters in your user settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Uploading Logs to the Website
            </h2>
            <img src={instructionGif} alt="instructionGif" className="w-64 h-auto" />
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Simply copy reports from your Hunt Analyzer and paste the results in the{" "}
              <Link
                to="/newsession"
                className="text-primary-600 hover:underline dark:text-primary-400"
              >
                New Session
              </Link>{" "}
              page (or HuntAnalyzer + TeamAnalyzer in case of teams).
              Another option is to export reports in <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">*.txt</code> or <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">*.JSON</code> format directly from the client. These files will save in your Tibia folders (<code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">./Tibia/packages/Tibia/log</code>).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              FAQ
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Is Tibia Logs Safe?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Tibia Logs simply processes raw combat log data and organizes it into a clean, visual format to help you analyze your performance. Processing your data in this way is completely safe! Signing in uses Firebase Authentication.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Are there add-ons to help me with combat logging?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Unfortunately, Cipsoft does not provide any external API to interact directly with client files. We're actively working on the only current possible solution.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Where Can I Find the Log File?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Locate your Tibia game folder, go into the correct game version folder, then find the <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Log</code> folder where your recent logs are stored (<code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">./Tibia/packages/Tibia/logs</code>).
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Contact Me
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I love hearing your feedback! Please join me on Discord to share any suggestions, ask questions, or chat.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For support questions, please reach out via email:{" "}
              <a
                href="mailto:wasilewski.arkadiusz96@gmail.com"
                className="text-primary-600 hover:underline dark:text-primary-400"
              >
                wasilewski.arkadiusz96@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
