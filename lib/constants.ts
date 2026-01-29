export const CODE_SNIPPETS: Record<string, string> = {
  javascript: `// Welcome to Monaco Editor!

console.log("Hello from Next.js!");
const sum = (a, b) => a + b;
console.log("Sum 5 + 3 =", sum(5, 3));`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
        
        int a = 5;
        int b = 3;
        System.out.println("Sum 5 + 3 = " + (a + b));
    }
}`,
  csharp: `using System;

public class Program {
    public static void Main() {
        Console.WriteLine("Hello from C#!");
        
        int a = 5;
        int b = 3;
        Console.WriteLine($"Sum 5 + 3 = {a + b}");
    }
}`,
  cpp: `#include <iostream>

int main() {
    std::cout << "Hello from C++!" << std::endl;
    
    int a = 5;
    int b = 3;
    std::cout << "Sum 5 + 3 = " << (a + b) << std::endl;
    
    return 0;
}`,
  html: `<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: sans-serif; text-align: center; padding: 20px; }
        h1 { color: #3b82f6; }
        button { padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer; }
    </style>
</head>
<body>
    <h1>Hello from HTML!</h1>
    <p>This is a live preview of your code.</p>
    <button onclick="alert('Clicked!')">Click Me</button>
</body>
</html>`,
};

export const LANGUAGE_VERSIONS: Record<string, string> = {
  javascript: "18.15.0",
  java: "15.0.2",
  csharp: "6.12.0",
  cpp: "10.2.0",
  html: "5",
};
