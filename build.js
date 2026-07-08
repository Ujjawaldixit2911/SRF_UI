const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projects = ['customer-master', 'design1', 'design2', 'design3', 'design4'];

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir);

// Create index.html portal
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SRF Customer Master Designs</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f4f6f8; color: #333; margin: 0; padding: 40px; display: flex; flex-direction: column; align-items: center; }
    h1 { color: #002b49; margin-bottom: 30px; font-weight: 800; text-align: center; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; width: 100%; max-width: 900px; }
    .card { background: #fff; padding: 24px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-decoration: none; color: inherit; transition: 0.3s; border: 1px solid #e2e8f0; display: flex; flex-direction: column; gap: 12px; }
    .card:hover { transform: translateY(-4px); box-shadow: 0 10px 15px rgba(0,0,0,0.1); border-color: #3b82f6; }
    .card-title { font-size: 18px; font-weight: 700; color: #0070d2; margin: 0; }
    .card-desc { font-size: 14px; color: #64748b; margin: 0; line-height: 1.5; }
    .arrow { margin-top: auto; color: #3b82f6; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 6px; }
  </style>
</head>
<body>
  <h1>SRF Customer Master - Design Iterations</h1>
  <div class="grid">
    <a href="./customer-master/" class="card">
      <h2 class="card-title">Original (customer-master)</h2>
      <p class="card-desc">The original unstyled base layout of the application.</p>
      <div class="arrow">View Design &rarr;</div>
    </a>
    <a href="./design1/" class="card">
      <h2 class="card-title">Design 1</h2>
      <p class="card-desc">Clean header navigation with integrated SRF animated banner.</p>
      <div class="arrow">View Design &rarr;</div>
    </a>
    <a href="./design2/" class="card">
      <h2 class="card-title">Design 2</h2>
      <p class="card-desc">Professional corporate theme with dense square cards and sub-tables.</p>
      <div class="arrow">View Design &rarr;</div>
    </a>
    <a href="./design3/" class="card">
      <h2 class="card-title">Design 3</h2>
      <p class="card-desc">Advanced data grid with expand/collapse views and integrated profile badges.</p>
      <div class="arrow">View Design &rarr;</div>
    </a>
    <a href="./design4/" class="card">
      <h2 class="card-title">Design 4</h2>
      <p class="card-desc">Alternative layout with experimental UI components.</p>
      <div class="arrow">View Design &rarr;</div>
    </a>
  </div>
</body>
</html>
`;
fs.writeFileSync(path.join(distDir, 'index.html'), htmlContent);

// Copy project dist folders
projects.forEach(project => {
  const src = path.join(__dirname, project, 'dist');
  const dest = path.join(distDir, project);
  if (fs.existsSync(src)) {
    console.log(\`Copying \${project}/dist to dist/\${project}...\`);
    fs.cpSync(src, dest, { recursive: true });
  } else {
    console.error(\`Warning: \${project}/dist not found. Did the build fail?\`);
  }
});

console.log('Build package complete! Ready for Vercel deployment.');
