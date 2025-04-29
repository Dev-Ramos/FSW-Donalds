'use client'

import { LayoutGroup, motion } from "motion/react"

const loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <LayoutGroup>
        <motion.span
          animate={{ y: [20, 0, 20], opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity}}
          className="w-6 h-6 rounded-full bg-red-700 mr-2" />
        <motion.span
          animate={{ y: [20, 0, 20], opacity: [1, 0, 1] }}
          transition={{ duration: 1, delay: 0.1, repeat: Infinity}}
          className="w-6 h-6 rounded-full bg-red-700 mr-2" />
        <motion.span
          animate={{ y: [20, 0, 20], opacity: [1, 0, 1] }}
          transition={{ duration: 1, delay: 0.2, repeat: Infinity}}
          className="w-6 h-6 rounded-full bg-red-700 mr-2" />
      </LayoutGroup>  
    </div>
  )
}

export default loading
