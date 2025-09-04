import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (props: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isSidebarOpen, setSidebarIsOpen] = useState(false);

	const [fontFamily, setFontFamily] = useState(articleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(articleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(articleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		articleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(articleState.contentWidth);

	const sidebarRef = useRef<HTMLDivElement | null>(null);

	// Закрытие сайдбара при клике вне
	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: sidebarRef,
		onChange: (value: boolean) => setSidebarIsOpen(value),
	});

	// Применение изменений
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState({
			...articleState,
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		});
	};

	// Сброс к дефолтным значениям
	const handleReset = () => {
		setArticleState(defaultArticleState);
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
	};

	return (
		<div ref={sidebarRef}>
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={() => setSidebarIsOpen(!isSidebarOpen)}
			/>

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={setFontFamily}
					/>

					<RadioGroup
						selected={fontSize}
						options={fontSizeOptions}
						name='fontSize'
						title='размер шрифта'
						onChange={setFontSize}
					/>

					<Select
						selected={fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={setFontColor}
					/>

					<Separator />

					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={setBackgroundColor}
					/>

					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={setContentWidth}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' htmlType='reset' />
						<Button title='Применить' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
