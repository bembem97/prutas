// Interface to defining our object of response functions
export interface ResponseFuncs {
  // GET?: Function
  // POST?: Function
  // PUT?: Function
  // DELETE?: Function
  // Interface to defining our object of response functions

  GET?: () => void
  POST?: () => void
  PUT?: () => void
  DELETE?: () => void
}
