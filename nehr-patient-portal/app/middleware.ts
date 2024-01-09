// export { default } from "next-auth/middleware";

export function middleware() {
  console.log("middleware");
  // return NextResponse.redirect(new URL("/home", request.url));
}

// export const config = {
//   matcher: ["/record-home", "/", "/posts"],
// };
