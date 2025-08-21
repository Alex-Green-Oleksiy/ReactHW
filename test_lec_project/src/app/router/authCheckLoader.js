export const authCheckLoader =
  ({ refreshMutex: _refreshMutex }) =>
  async (_route) => {
    // No-op reads to mark parameters as intentionally used
    void _refreshMutex
    void _route
    return true
  }
