const fs = require('fs');

const staticPages = ['/', '/contact', '/marketplace', '/about', '/services','/calculator','/projects','/CarbonCreditsPage'];

const sitemap = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(page => `
      <url>
        <loc>https://ecarbon5.onrender.com${page}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>
    `)
    .join('')}
</urlset>
`;

fs.writeFileSync('public/sitemap.xml', sitemap);
console.log('Sitemap generated!');
