type StockProps = {
  children
}

export interface StockData {
  
}

export default function Stock({ children }: StockProps) {
  return (
    <div id="appframe" className="flex flex-row m-0 p-0 w-max h-max">
      {children}
    </div>
  )
}