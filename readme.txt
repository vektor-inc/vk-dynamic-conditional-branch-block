=== VK Dynamic If Block ===
Contributors: vektor-inc,kurudrive
Tags: dynamic, block, if, front page, single
Requires at least: 6.0
Tested up to: 6.2
Requires PHP: 7.0
Stable tag: 0.1.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

A dynamic block that shows its Inner Blocks based on specified conditions, such as whether the current page is the front page or a single post.

== Description ==

VK Dynamic If Block is a custom WordPress block, primarily designed for FSE, that allows users to display Innder Block based on specified conditions. With this block, you can show or hide Innder Block depending on various conditions, such as whether the current page is the front page, a single post, a specific Post Type, or other conditions.

== Installation ==

1. Upload the plugin files to the '/wp-content/plugins/vk-dynamic-if-block' directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Use the block editor to add a "Dynamic If" block to your post or page.

== Frequently Asked Questions ==

= Can I use multiple conditions? =

Currently, you can only choose one condition per block. However, you can use multiple blocks with different conditions on the same page.

= Can I use custom conditions? =

Currently, only the predefined conditions are supported: is_front_page() and is_single().

== Screenshots ==

1. Block settings in the editor sidebar.
2. Dynamic If block in the site editor.
3. Dynamic If block in the site editor.

== Changelog ==

= 0.1.1 =
* Update test

= 0.1.0 =
* Initial release

== Upgrade Notice ==

= 0.1.0 =
* Initial release
