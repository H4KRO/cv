import { paraglideVitePlugin } from '@inlang/paraglide-js';
import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'node:path';

// Automatically add a Tailwind @reference to Svelte <style> blocks that use @apply.
// This avoids having to manually write @reference in every component.
function autoTailwindReference() {
	return {
		name: 'auto-tailwind-reference',
		enforce: 'pre' as const,
		transform(code: string, id: string) {
			if (!id.endsWith('.svelte') || !code.includes('<style')) return null;

			const appCssAbs = path.resolve(process.cwd(), 'src/app.css');

			const transformed = code.replace(
				/<style(\s[^>]*)?>([\s\S]*?)<\/style>/g,
				(full, attrs = '', content = '') => {
					// Only inject when using @apply and when no existing @reference is present
					if (!content.includes('@apply') || content.includes('@reference')) {
						return full;
					}

					const fromDir = path.dirname(id);
					let rel = path.relative(fromDir, appCssAbs).replace(/\\/g, '/');
					if (!rel.startsWith('.')) rel = './' + rel;

					const insertion = `\n  @reference "${rel}";\n`;
					return `<style${attrs}>${insertion}${content}</style>`;
				}
			);

			if (transformed === code) return null;

			return { code: transformed, map: null };
		},
	};
}

export default defineConfig({
	plugins: [
		tailwindcss(),
		autoTailwindReference(),
		sveltekit(),
		devtoolsJson(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		})
	]
});
