interface AppFrameProps {
  children;
}

export default function AppFrame({ children }: AppFrameProps) {
  return (
    <div id="appframe" className="flex flex-row m-0 p-0 w-screen h-screen text-white">
      {children}
    </div>
  )
}