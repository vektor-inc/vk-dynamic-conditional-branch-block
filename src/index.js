import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	__experimentalNumberControl as NumberControl,
	DatePicker
} from '@wordpress/components';
import { ReactComponent as Icon } from './icon.svg';
import transforms from './transforms';

registerBlockType('vk-blocks/dynamic-if', {
	apiVersion: 2,
	title: __('Dynamic If', 'vk-dynamic-if-block'),
	icon: <Icon />,
	transforms,
	category: 'theme',
	attributes: {
		ifPageType: {
			type: 'string',
			default: 'none',
		},
		ifPostType: {
			type: 'string',
			default: 'none',
		},
		customFieldName: {
			type: 'string',
			"default": ""
		},
		customFieldRule: {
			type: 'string',
			"default": ""
		},
		customFieldValue: {
			type: 'string',
			"default": ""
		},
		moreOrLessValueType: {
			type: 'string',
			"default": "number"
		},
		moreThanValueNumber: {
			type: 'string',
			"default": ""
		},
		lessThanValueNumber: {
			type: 'string',
			"default": ""
		},
		moreThanValueDate: {
			type: 'string',
			"default": ""
		},
		lessThanValueDate: {
			type: 'string',
			"default": ""
		},
		exclusion: {
			type: 'boolian',
			default: false,
		},
	},
	supports: {
		html: false,
		innerBlocks: true,
	},
	edit({ attributes, setAttributes }) {
		const { ifPageType, ifPostType, customFieldName, customFieldRule, customFieldValue, moreOrLessValueType, moreThanValueNumber, lessThanValueNumber, moreThanValueDate, lessThanValueDate, exclusion } = attributes;
		attributes.moreOrLessValueType = moreOrLessValueType

		const ifPageTypes = [
			{ value: 'none', label: __('No restriction', 'vk-dynamic-if-block') },
			{ value: 'is_front_page', label: __('Front Page', 'vk-dynamic-if-block') + ' ( is_front_page() )' },
			{ value: 'is_single', label: __('Single', 'vk-dynamic-if-block') + ' ( is_single() )' },
			{ value: 'is_page', label: __('Page', 'vk-dynamic-if-block') + ' ( is_page() )' },
			{ value: 'is_singular', label: __('Singular', 'vk-dynamic-if-block') + ' ( is_singular() )' },
			{ value: 'is_home', label: __('Post Top', 'vk-dynamic-if-block') + ' ( is_home() && ! is_front_page() )' },
			{ value: 'is_post_type_archive', label: __('Post Type Archive', 'vk-dynamic-if-block') + ' ( is_post_type_archive() )' },
			{ value: 'is_category', label: __('Category Archive', 'vk-dynamic-if-block') + ' ( is_category() )' },
			{ value: 'is_tag', label: __('Tag Archive', 'vk-dynamic-if-block') + ' ( is_tag() )' },
			{ value: 'is_tax', label: __('Taxonomy Archive', 'vk-dynamic-if-block') + ' ( is_tax() )' },
			{ value: 'is_year', label: __('Yearly Archive', 'vk-dynamic-if-block') + ' ( is_year() )' },
			{ value: 'is_month', label: __('Monthly Archive', 'vk-dynamic-if-block') + ' ( is_month() )' },
			{ value: 'is_date', label: __('Daily Archive', 'vk-dynamic-if-block') + ' ( is_date() )' },
			{ value: 'is_author', label: __('Author Archive', 'vk-dynamic-if-block') + ' ( is_author() )' },
			{ value: 'is_archive', label: __('Archive', 'vk-dynamic-if-block') + ' ( is_archive() )' },
			{ value: 'is_search', label: __('Search Result', 'vk-dynamic-if-block') + ' ( is_search() )' },
			{ value: 'is_404', label: __('404', 'vk-dynamic-if-block') + ' ( is_404() )' },
		];

		const blockClassName = `vk-dynamic-if-block ifPageType-${ifPageType} ifPostType-${ifPostType}`;
		const MY_TEMPLATE = [
			['core/paragraph', {}],
		];

		let labels = [];

		if (ifPageType !== "none") {
			labels.push(ifPageType);
		}

		if (ifPostType !== "none") {
			labels.push(ifPostType);
		}

		if (customFieldName) {
			labels.push(customFieldName);
		}

		let labels_string = labels.join(" / ");

		return (
			<div {...useBlockProps({ className: blockClassName })}>
				<InspectorControls>
					<PanelBody title={__('Display Conditions', 'vk-dynamic-if-block')}>
						<SelectControl
							label={__('Page Type', 'vk-dynamic-if-block')}
							value={ifPageType}
							options={ifPageTypes}
							onChange={(value) => setAttributes({ ifPageType: value })}
						/>
						<SelectControl
							label={__('Post Type', 'vk-dynamic-if-block')}
							value={ifPostType}
							options={vk_dynamic_if_block_localize_data.postTypeSelectOptions}
							onChange={(value) => setAttributes({ ifPostType: value })}
						/>
						<TextControl
							label={__('Custom Field Name', 'vk-dynamic-if-block')}
							value={customFieldName}
							onChange={(value) =>
								setAttributes({ customFieldName: value })
							}
						/>
						{customFieldName && (
							<>
								<SelectControl
									label={__('Custom Field Rule', 'vk-dynamic-if-block')}
									value={customFieldRule}
									options={[
										{ value: 'valueExists', label: __('Value Exist ( !empty() )', 'vk-dynamic-if-block') },
										{ value: 'valueEquals', label: __('Value Equals ( === )', 'vk-dynamic-if-block') },
										{ value: 'moreOrLess', label: __('More or Less', 'vk-dynamic-if-block') },
									]}
									onChange={(value) => setAttributes({ customFieldRule: value })}
								/>
								{customFieldRule === 'valueEquals' && (
									<>
										<TextControl
											label={__('Custom Field Value', 'vk-dynamic-if-block')}
											value={customFieldValue}
											onChange={(value) =>
												setAttributes({ customFieldValue: value })
											}
										/>
									</>
								)}
								{customFieldRule === 'moreOrLess' && (
									<>
										<SelectControl
											label={__('Custom Field Rule', 'vk-dynamic-if-block')}
											value={moreOrLessValueType}
											options={[
												{ value: 'number', label: __('Number', 'vk-dynamic-if-block') },
												{ value: 'date', label: __('Date', 'vk-dynamic-if-block') },
											]}
											onChange={(value) => setAttributes({ moreOrLessValueType: value })}
										/>
										{moreOrLessValueType === 'number' && (
											<>
												<NumberControl
													label={__('More than Value', 'vk-dynamic-if-block')}
													step="0.5"
													value={moreThanValueNumber}
													onChange={(value) =>
														setAttributes({ moreThanValueNumber: value })
													}
												/>
												<NumberControl
													label={__('Less than Value', 'vk-dynamic-if-block')}
													step="0.5"
													value={lessThanValueNumber}
													onChange={(value) =>
														setAttributes({ lessThanValueNumber: value })
													}
												/>
											</>
										)}
										{moreOrLessValueType === 'date' && (
											<>
												<DatePicker
													label={__('More than Value', 'vk-dynamic-if-block')}
													currentDate={moreThanValueDate}
													onChange={(newDate) =>
														setAttributes({ moreThanValueDate: newDate })
													}
												/>
												<DatePicker
													label={__('Less than Value', 'vk-dynamic-if-block')}
													currentDate={lessThanValueDate}
													onChange={(newDate) =>
														setAttributes({ lessThanValueDate: newDate })
													}
												/>
											</>
										)}

									</>
								)}
							</>
						)}

						<ToggleControl
							label={__('Exclusion designation', 'vk-dynamic-if-block')}
							checked={exclusion}
							onChange={(checked) => setAttributes({ exclusion: checked })}
						/>
					</PanelBody>
				</InspectorControls>
				<div className="vk-dynamic-if-block__label">{labels_string}</div>

				<InnerBlocks
					template={MY_TEMPLATE}
				/>
			</div>
		);
	},

	save() {
		return <InnerBlocks.Content />;
	},
});
