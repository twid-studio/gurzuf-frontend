import { ease } from "./ease";

export const anim = (variants) => {
  return {
    initial: "initial",
    animate: "animate",
    exit: "exit",
    variants,
  };
};

export const MenuAnim = {
  wrapper: {
    initial: {
      clipPath: "inset(0% 0% 100% 0%)",
    },
    animate: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: 1,
        ease: ease.inOutExpo,
      },
    },
    exit: {
      clipPath: "inset(0% 0% 100% 0%)",
      transition: {
        duration: 1,
        ease: ease.outExpo,
      },
    },
  },
  backround: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: .5,
        delay: 0.2,
      },
    },
  },
}

export const OperationsAnim = {
  timeline: {
    initial: {
      marginTop: "0",
      opacity: 0,
      height: "0",
      y: "-50%",
    },
    animate: {
      marginTop: "1em",
      opacity: 1,
      height: ".3em",
      y: "0%",
      transition: {
        duration: 0.7,
        ease: ease.outExpo,
      },
    },
    exit: {
      marginTop: "0",
      opacity: 0,
      height: "0",
      y: "-50%",
      transition: {
        duration: 0.7,
        ease: ease.outExpo,
      },
    },
  },
  video: {
    initial: {
      opacity: 0,
      scale: 1.1,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: ease.outExpo,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: {
        duration: 0.7,
        ease: ease.outExpo,
      },
    },
  }
}

export const FormAnim = {
  succes: {
    initial: {
      scale: 1.1,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: ease.outExpo,
      },
    },
    exit: {
      scale: 1.1,
      opacity: 0,
      transition: {
        duration: 0.7,
        ease: ease.outExpo,
      },
    },
  }
}
