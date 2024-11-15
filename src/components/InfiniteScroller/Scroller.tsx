import React from "react";
import "./Scroller.css";
import {
  SiPython,
  SiPytorch,
  SiFlask,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTensorflow,
  SiNumpy,
  SiPandas,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiSqlalchemy,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiVercel,
  SiAmazonwebservices,
  SiGooglecloud
} from "react-icons/si";

const Scroller = () => {
  React.useEffect(() => {
    const scroller = document.querySelector(".scroller");
    const scrollerInner = document.querySelector(".scroller__inner");

    if (
      scroller &&
      scrollerInner &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      addAnimation(scroller, scrollerInner);
    }
  }, []); // Empty dependency array to run the effect only once on mount

  function addAnimation(scroller:any, scrollerInner:any) {
    scroller.setAttribute("data-animated", "true");

    const scrollerContent = Array.from(scrollerInner.children);
    scrollerContent.forEach((item:any) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", "true");
      scrollerInner.appendChild(duplicatedItem);
    });
  }
  const testimonials = [
    { name: "Python", image: <SiPython size={80} /> },
    { name: "PyTorch", image: <SiPytorch size={80} /> },
    { name: "Flask", image: <SiFlask size={80} /> },
    { name: "TensorFlow", image: <SiTensorflow size={80} /> },
    { name: "NumPy", image: <SiNumpy size={80} /> },
    { name: "Pandas", image: <SiPandas size={80} /> },
    { name: "JavaScript", image: <SiJavascript size={80} /> },
    { name: "React", image: <SiReact size={80} /> },
    { name: "Next.js", image: <SiNextdotjs size={80} /> },
    { name: "Node.js", image: <SiNodedotjs size={80} /> },
    { name: "TypeScript", image: <SiTypescript size={80} /> },
    { name: "HTML5", image: <SiHtml5 size={80} /> },
    { name: "CSS3", image: <SiCss3 size={80} /> },
    { name: "Tailwind CSS", image: <SiTailwindcss size={80} /> },
    { name: "Bootstrap", image: <SiBootstrap size={80} /> },
    { name: "Sass", image: <SiSass size={80} /> },
    { name: "SQLAlchemy", image: <SiSqlalchemy size={80} /> },
    { name: "MongoDB", image: <SiMongodb size={80} /> },
    { name: "PostgreSQL", image: <SiPostgresql size={80} /> },
    { name: "MySQL", image: <SiMysql size={80} /> },
    { name: "Firebase", image: <SiFirebase size={80} /> },
    { name: "Vercel", image: <SiVercel size={80} /> },
    { name: "Amazon Web Services", image: <SiAmazonwebservices size={80} /> },
    { name: "Google Cloud", image: <SiGooglecloud size={80} /> },
  ];
  return (
    <div className="min-w-full">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="font-f2 text-white text-3xl">Tech Stack</h1>
        <div className="scroller" data-direction="left" data-speed="slow">
          <div className="scroller__inner gap-20 w-[80%]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-item flex flex-col items-center justify-center gap-16 mx-4"
              >
                {testimonial.image}
                <p className="-mt-8">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scroller;
