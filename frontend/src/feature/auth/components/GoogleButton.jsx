import { motion } from "motion/react";

function GoogleButton({ disabled = false, onClick }) {
  return (
    <motion.a
      href={disabled ? undefined : "http://localhost:3000/api/auth/google"}
      aria-disabled={disabled}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`w-full py-3 px-4 border-2 border-gray-300 bg-white text-black font-semibold rounded-lg flex items-center justify-center gap-3 transition ${
        disabled
          ? "cursor-not-allowed opacity-60"
          : "cursor-pointer hover:border-black hover:bg-gray-50"
      }`}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-sm font-bold">
        G
      </span>
      Continue with Google
    </motion.a>
  );
}

export default GoogleButton;
