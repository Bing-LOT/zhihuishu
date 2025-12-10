/**
 * 创建占位图片配置文件
 * 在实际图片资源到位之前，使用在线占位图服务
 */

const fs = require('fs');
const path = require('path');

// 占位图片映射（使用在线服务）
const placeholders = {
  // 英雄横幅
  'home/hero-banner-1.jpg': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=756&fit=crop',
  'home/hero-banner-2.jpg': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=756&fit=crop',
  'home/hero-banner-3.jpg': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=756&fit=crop',
  
  // Logo 和图标
  'home/fzu-logo.png': 'https://via.placeholder.com/144x48/bc2220/ffffff?text=FZU',
  'home/fzu-logo-white.png': 'https://via.placeholder.com/180x60/bc2220/ffffff?text=FZU',
  'home/fzu-emblem.png': 'https://via.placeholder.com/80x80/bc2220/ffffff?text=校徽',
  
  // 课程封面
  'home/course-1.jpg': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=364&h=200&fit=crop',
  
  // 视频缩略图
  'home/video-1.jpg': 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=320&h=212&fit=crop',
  'home/video-2.jpg': 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=320&h=172&fit=crop',
  'home/video-3.jpg': 'https://images.unsplash.com/photo-1562774053-701939374585?w=320&h=172&fit=crop',
  'home/video-4.jpg': 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=320&h=172&fit=crop',
  
  // 装饰元素（临时使用简单图形）
  'home/title-decoration.png': 'https://via.placeholder.com/96x96/ffffff/bc2220?text=★',
  'home/title-decoration-small.png': 'https://via.placeholder.com/20x20/ffffff/bc2220?text=★',
  'home/title-line-left.png': 'https://via.placeholder.com/121x37/bc2220/ffffff?text=━',
  'home/title-line-right.png': 'https://via.placeholder.com/121x37/bc2220/ffffff?text=━',
  'home/button-pattern.png': 'https://via.placeholder.com/197x261/ecd9ba/ecd9ba?text=pattern',
  
  // 背景
  'backgrounds/footer-pattern.png': 'https://via.placeholder.com/1920x220/bc2220/bc2220?text=pattern',
  
  // 图标
  'icons/beian.png': 'https://via.placeholder.com/18x20/ffffff/ffffff?text=备',
};

// 创建配置文件
const configPath = path.join(__dirname, '..', 'public', 'images', 'placeholders.json');

// 确保目录存在
const configDir = path.dirname(configPath);
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

// 写入配置
fs.writeFileSync(configPath, JSON.stringify(placeholders, null, 2), 'utf-8');

console.log('✅ 占位图片配置已创建: public/images/placeholders.json\n');
console.log('📋 占位图片列表：\n');

Object.entries(placeholders).forEach(([local, url]) => {
  console.log(`  ${local}`);
  console.log(`  -> ${url}\n`);
});

console.log('💡 提示：');
console.log('  1. 这些是临时占位图，使用在线图片服务');
console.log('  2. 正式部署前，请替换为实际的设计图片');
console.log('  3. 将图片文件放置在 public/images/ 对应目录下');
console.log('  4. 确保图片尺寸符合设计规范（见 public/images/README.md）\n');

// 创建一个简单的 .env.local 文件示例
const envExample = `# 图片资源配置
# 开发环境可以使用占位图，生产环境必须使用实际图片

# 是否使用占位图（development: true, production: false）
VITE_USE_PLACEHOLDER_IMAGES=true

# CDN 地址（可选）
# VITE_IMAGE_CDN=https://cdn.example.com
`;

const envPath = path.join(__dirname, '..', '.env.local.example');
fs.writeFileSync(envPath, envExample, 'utf-8');

console.log('✅ 环境变量示例已创建: .env.local.example\n');
console.log('执行以下命令启动开发服务器：');
console.log('  npm run dev\n');

