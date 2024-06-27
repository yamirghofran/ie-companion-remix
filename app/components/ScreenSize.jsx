import React from "react";
const ScreenSize = () => {
    if (process.env.NODE_ENV === "production") return null;
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    function updateDimensions() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const { width, height } = dimensions;

  return (
    <div className="fixed bottom-5 left-5 z-50 flex items-center space-x-2 rounded-full bg-black px-2.5 py-1 font-mono text-xs font-medium text-white">
        <span>
        {width.toLocaleString()} x {height.toLocaleString()}
      </span>
      <div className="h-4 w-px bg-gray-800" />
      <span className="sm:hidden">XS</span>
      <span className="hidden sm:max-md:inline">SM</span>
      <span className="hidden md:max-lg:inline">MD</span>
      <span className="hidden lg:max-xl:inline">LG</span>
      <span className="hidden xl:max-2xl:inline">XL</span>
      <span className="max-2xl:hidden">2XL</span>
    </div>
  );
};

export default ScreenSize;
