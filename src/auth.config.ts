// Notice this is only an object, not a full Auth.js instance
const authConfig = {
  trustHost: true,
  providers: [],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /\/citizen(\/.*)?/,
        /\/agency(\/.*)?/,
        /\/admin(\/.*)?/,
      ];
      const { pathname } = request.nextUrl;
      if (protectedPaths.some((p) => p.test(pathname))) return !!auth;
      return true;
    },
  },
};

export default authConfig;
