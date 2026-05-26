import { PERSONAL, PROJECTS, SKILLS, EXPERIENCE, CONTRIBUTIONS } from '@/lib/data';
import type { FSDirectory, FSFile, FSNode } from './types';
import type { PostMeta } from '@/lib/mdx';

// Fallback blog posts if real MDX is empty or unavailable
const FALLBACK_BLOG_POSTS: PostMeta[] = [
  {
    slug: 'building-rune-lang',
    title: 'Building Rune Lang: A Programming Language From Scratch',
    description: 'Lexer, parser, AST, and tree-walk interpreter — all in Python.',
    date: '2024-11-15',
    readingTime: '12 min read',
    tags: ['Python', 'Language Design', 'Compilers'],
  },
  {
    slug: 'percept-ui-story',
    title: 'Lessons From Creating an Open Source React Component Library',
    description: 'API design, npm publishing, DX trade-offs, and growing a community.',
    date: '2024-12-01',
    readingTime: '8 min read',
    tags: ['React', 'Open Source', 'TypeScript'],
  },
  {
    slug: 'open-source-journey',
    title: 'My First 10 Merged PRs and What I Learned',
    description: 'What worked, what got rejected, and habits that made me a better collaborator.',
    date: '2025-01-10',
    readingTime: '6 min read',
    tags: ['Open Source', 'Git', 'Career'],
  },
];

/**
 * Dynamically builds the Virtual File System (VFS) tree from the shared portfolio data
 */
export function generateVFS(posts?: PostMeta[]): FSDirectory {
  // 1. Generate core txt files
  const aboutContent = `${PERSONAL.name}
${PERSONAL.title}
Location: ${PERSONAL.location}
Availability: ${PERSONAL.available ? 'Available for new opportunities' : 'Not available'}

Bio:
${PERSONAL.bio}
`;

  const contactContent = `Contact Information:
--------------------
Email:   ${PERSONAL.email}
GitHub:  ${PERSONAL.github}
Twitter: ${PERSONAL.twitter}
`;

  const openSourceContent = `Open Source Contributions:
---------------------------
${CONTRIBUTIONS.map(c => `[${c.date}] [${c.type}] [${c.status}] ${c.repo}
  Title: ${c.title}
  URL:   ${c.url}
  ${c.description ? `Desc:  ${c.description}` : ''}`).join('\n\n')}
`;

  // 2. Generate skills directory children
  const skillsDirChildren: Record<string, FSFile | FSDirectory> = {};
  const categories = ['languages', 'frontend', 'backend', 'databases', 'integrations', 'tools', 'other'] as const;
  
  categories.forEach(cat => {
    const catSkills = SKILLS.filter(s => s.category === cat);
    if (catSkills.length > 0) {
      const displayCategory = cat.charAt(0).toUpperCase() + cat.slice(1);
      const content = `${displayCategory} Skills:\n` + 
        catSkills.map(s => {
          const bar = '█'.repeat(s.level * 3) + '░'.repeat((3 - s.level) * 3);
          return `${bar} ${s.name}`;
        }).join('\n');
      
      skillsDirChildren[`${cat}.txt`] = {
        type: 'file',
        name: `${cat}.txt`,
        content
      };
    }
  });

  // 3. Generate projects directory children
  const projectsDirChildren: Record<string, FSFile | FSDirectory> = {};
  PROJECTS.forEach(p => {
    const filename = `${p.id}.md`;
    const content = `# ${p.title} (${p.year})
${p.featured ? '[Featured Project]' : ''}

Description:
${p.description}

Details:
${p.longDescription}

Tech Tags: ${p.tags.join(', ')}
${p.url ? `Project URL: ${p.url}` : ''}
${p.github ? `GitHub URL:  ${p.github}` : ''}
`;

    projectsDirChildren[filename] = {
      type: 'file',
      name: filename,
      content
    };
  });

  // 4. Generate blog directory children from dynamic MDX posts metadata
  const blogDirChildren: Record<string, FSFile | FSDirectory> = {};
  const activePosts = posts && posts.length > 0 ? posts : FALLBACK_BLOG_POSTS;
  activePosts.forEach(b => {
    const filename = `${b.slug}.md`;
    const content = `# ${b.title} (${b.date})
Reading Time: ${b.readingTime}
Tags: ${b.tags.join(', ')}

Abstract:
${b.description}
`;

    blogDirChildren[filename] = {
      type: 'file',
      name: filename,
      content
    };
  });

  // 5. Build full tree
  const visitorHome: FSDirectory = {
    type: 'dir',
    name: 'visitor',
    children: {
      'about.txt': {
        type: 'file',
        name: 'about.txt',
        content: aboutContent
      },
      'contact.txt': {
        type: 'file',
        name: 'contact.txt',
        content: contactContent
      },
      'opensource.txt': {
        type: 'file',
        name: 'opensource.txt',
        content: openSourceContent
      },
      'resume.pdf': {
        type: 'file',
        name: 'resume.pdf',
        content: 'Opening resume.pdf in a new tab...'
      },
      'skills': {
        type: 'dir',
        name: 'skills',
        children: skillsDirChildren
      },
      'projects': {
        type: 'dir',
        name: 'projects',
        children: projectsDirChildren
      },
      'blog': {
        type: 'dir',
        name: 'blog',
        children: blogDirChildren
      },
      '.secrets': {
        type: 'dir',
        name: '.secrets',
        children: {
          'easter-egg.txt': {
            type: 'file',
            name: 'easter-egg.txt',
            content: 'You found the easter egg!\nTry running the "theme dark" or "mode 1" commands.'
          }
        }
      }
    }
  };

  // Root directory structure
  return {
    type: 'dir',
    name: '',
    children: {
      'home': {
        type: 'dir',
        name: 'home',
        children: {
          'visitor': visitorHome
        }
      }
    }
  };
}

/**
 * Resolves a relative or absolute path against the current path state
 */
export function resolvePath(
  currentPath: string[],
  target: string,
  root: FSDirectory
): { path: string[]; node: FSFile | FSDirectory } | null {
  if (!target) {
    return { path: ['home', 'visitor'], node: getFSNode(['home', 'visitor'], root) as FSDirectory };
  }

  if (target === '~') {
    return { path: ['home', 'visitor'], node: getFSNode(['home', 'visitor'], root) as FSDirectory };
  }

  const parts = target.split('/').filter(Boolean);
  let workingPath = target.startsWith('/') ? [] : [...currentPath];

  for (const part of parts) {
    if (part === '.') {
      continue;
    }
    if (part === '..') {
      if (workingPath.length > 0) {
        workingPath.pop();
      }
      continue;
    }
    workingPath.push(part);
  }

  const node = getFSNode(workingPath, root);
  if (!node) return null;

  return { path: workingPath, node };
}

/**
 * Retrieves a node at a given path array
 */
export function getFSNode(path: string[], root: FSDirectory): FSFile | FSDirectory | null {
  let current: FSFile | FSDirectory = root;
  for (const part of path) {
    if (current.type !== 'dir') return null;
    const nextNode: FSFile | FSDirectory | undefined = (current as FSDirectory).children[part];
    if (!nextNode) return null;
    current = nextNode;
  }
  return current;
}
