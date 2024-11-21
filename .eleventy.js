const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");
const { minify } = require("terser");

module.exports = function(eleventyConfig) {
    // Production mode check
    const isProd = process.env.NODE_ENV === 'production';

    // Copy static assets
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("js");
    
    // Minify CSS
    eleventyConfig.addFilter("cssmin", function(code) {
        if (!isProd) return code;
        return new CleanCSS({}).minify(code).styles;
    });

    // Minify JS
    eleventyConfig.addNunjucksAsyncFilter("jsmin", async function(code, callback) {
        if (!isProd) {
            callback(null, code);
            return;
        }
        try {
            const minified = await minify(code);
            callback(null, minified.code);
        } catch (err) {
            console.error("Terser error: ", err);
            callback(null, code);
        }
    });

    // Minify HTML
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
        if (!isProd || !outputPath.endsWith(".html")) {
            return content;
        }
        
        return htmlmin.minify(content, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        });
    });

    return {
        dir: {
            input: ".",
            output: "_site",
            includes: "_includes",
            data: "_data"
        }
    };
};
