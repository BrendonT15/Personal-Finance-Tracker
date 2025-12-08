import gsap from "gsap";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useRef, useCallback, useState } from "react";

interface ValueItem {
  title: string;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
}

const values: ValueItem[] = [
  {
    title: "Commit Fully",
    description1: "We put our full energy into every project we touch.",
    description2:
      "We believe great work requires commitment, curiosity, and courage.",
    description3:
      "We don’t stop at the first solution — we dig deeper to uncover what truly matters.",
    description4:
      "Our mindset ensures we deliver meaningful outcomes, not just completed tasks.",
  },
  {
    title: "Embrace Openness",
    description1: "Good ideas can come from anywhere.",
    description2:
      "We collaborate with openness, leaving ego and hierarchy at the door.",
    description3:
      "We value iteration over perfection, feedback over silence, progress over pride.",
    description4:
      "If something doesn’t work, we change direction quickly and without hesitation.",
  },
  {
    title: "Adapt Rapidly",
    description1: "We move fast, adapt fast, and respond with clarity and intent.",
    description2:
      "Challenges don’t slow us down — they sharpen our thinking.",
    description3:
      "When priorities shift, we pivot with confidence instead of panic.",
    description4:
      "Our agility lets us deliver results even when the unexpected happens.",
  },
  {
    title: "Pursue Excellence",
    description1: "Good work is the baseline — we strive for exceptional.",
    description2:
      "We raise standards continuously, always searching for better ways forward.",
    description3:
      "We challenge assumptions, question norms, and explore beyond the obvious.",
    description4:
      "No shortcuts, no complacency — we're committed to long-term excellence.",
  },
];


const OurValues = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const q = gsap.utils.selector(containerRef);

  const handleTextHover = useCallback(
    (index: number) => {
      const headings = q(".value-heading");
      if (headings[index]) {
        gsap.to(headings[index], {
          x: 40,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    },
    [q]
  );

  const handleTextLeave = useCallback(
    (index: number) => {
      const headings = q(".value-heading");
      if (headings[index]) {
        gsap.to(headings[index], {
          x: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    },
    [q]
  );

  const toggleExpand = useCallback(
    (index: number) => {
      const content = contentRefs.current[index];
      if (!content) return;

      if (expandedIndex === index) {
        // Collapse
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.out",
          onComplete: () => setExpandedIndex(null),
        });
      } else {
        if (expandedIndex !== null && contentRefs.current[expandedIndex]) {
          gsap.to(contentRefs.current[expandedIndex], {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power3.out",
          });
        }

        setExpandedIndex(index);
        gsap.fromTo(
          content,
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          }
        );
      }
    },
    [expandedIndex]
  );

  return (
    <>
      <div className="w-full p-8">
        <div className="grid grid-cols-[25%_auto] gap-2">
          <p className="font-light">OUR VALUES</p>

          <div
            ref={containerRef}
            className="flex flex-col gap-20 overflow-x-hidden"
          >
            <p className="text-xl font-semibold w-1/4">
              Our values shape what we are, how we work, and who we collaborate
              with.
            </p>
            <div className="flex flex-col gap-8">
              {values.map((value, index) => (
                <div key={index}>
                  <div className="border border-b border-black"></div>

                  <div
                    className="flex items-center justify-between cursor-pointer py-4"
                    onClick={() => toggleExpand(index)}
                  >
                    <h2
                      className="text-8xl font-semibold value-heading"
                      onMouseEnter={() => handleTextHover(index)}
                      onMouseLeave={() => handleTextLeave(index)}
                    >
                      {value.title}
                    </h2>
                    {expandedIndex === index ? (
                      <RemoveIcon fontSize="large" />
                    ) : (
                      <AddIcon fontSize="large" />
                    )}
                  </div>

                  {/* Expandable content */}
                  <div
                    ref={(el) => {
                      contentRefs.current[index] = el;
                    }}
                    className="grid grid-cols-[25%_auto] overflow-hidden opacity-0 h-0"
                  >
                    <p className="text-xl font-semibold">
                      {value.description1}
                    </p>
                    <div className="flex flex-col gap-4 w-4/5">
                      {" "}
                      <p className="text-xl font-light ">
                        {value.description2}
                      </p>{" "}
                      <p className="text-xl font-light ">
                        {value.description3}
                      </p>{" "}
                      <p className="text-xl font-light ">
                        {value.description4}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="border border-b border-black"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurValues;
