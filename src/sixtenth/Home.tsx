export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">🏠 Mini Blog</h1>
      <p className="mt-2">Welcome to my blog website! Check out the latest posts below:</p>
      <ul className="list-disc pl-6 mt-4">
        <li><a href="/blog">👉 How I built this blog in React</a></li>
      </ul>
    </div>
  );
}
