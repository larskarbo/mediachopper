export default function Footer() {
  return (
    <footer className="pt-28 w-full" aria-labelledby="footerHeading">
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <p className="mt-4 text-sm text-gray-300">
          MediaChopper is a video editing platform that allows you to export individual clips from Davinci Resolve.
        </p>
        <div className="flex py-4">
          <div
            className="font-light flex items-center border border-gray-400 rounded p-2 px-4
                   transition-colors duration-150 hover:shadow-sm
                  "
          >
            made by
            <img
              alt="Lars"
              className="rounded-full ml-2 w-8"
              src="https://s.gravatar.com/avatar/4579b299730ddc53e3d523ec1cd5482a?s=72"
            />
            <a className="mx-2" href="https://larskarbo.no" target="_blank" rel="noreferrer">
              <strong className="font-bold">@larskarbo</strong>
            </a>
            and
            <a className="mx-2" href="https://twitter.com/alberto_villa" target="_blank" rel="noreferrer">
              <strong className="font-bold">@alberto_villa</strong>
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2"></div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2021 MediaChopper. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
