'use client';

import React, { forwardRef } from 'react';
import Svg from '../svg/Svg';

type InputProps = {
	label: string;
	inputType: 'text' | 'number' | 'date' | 'textarea' | 'checkbox';
	error?: string;
} & React.InputHTMLAttributes<HTMLInputElement> &
	React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
	({ label, inputType, error, ...inputProps }, ref) => {
		const inputId = inputProps.id ?? inputProps.name;

		return (
			<div className='flex flex-col gap-1'>
				<div
					className={`flex ${inputType === 'textarea' ? 'flex-col' : 'flex-row items-center justify-between gap-2'}
                    ${inputType === 'checkbox' ? 'px-1' : 'bg-custom-transparent-medium-gray rounded-md border border-zinc-700 py-2 px-4 focus-within:border-zinc-50 transition-all'}
                    `}
				>
					<label className='text-white text-base font-semibold' htmlFor={inputId}>
						{label}
					</label>
					{(() => {
						if (inputType === 'textarea') {
							return (
								<textarea
									id={inputId}
									ref={ref as React.Ref<HTMLTextAreaElement>}
									className='bg-transparent text-white text-base font-light grow outline-hidden resize-none'
									{...inputProps}
								/>
							);
						} else if (inputType === 'checkbox') {
							return (
								<input
									id={inputId}
									type={inputType}
									ref={ref as React.Ref<HTMLInputElement>}
									className='h-5 w-5 cursor-pointer color-scheme-dark'
									{...inputProps}
								/>
							);
						} else {
							return (
								<input
									id={inputId}
									type={inputType}
									inputMode={inputType === 'number' ? 'numeric' : undefined}
									ref={ref as React.Ref<HTMLInputElement>}
									className='relative bg-transparent text-white text-end text-base font-light grow outline-hidden color-scheme-dark'
									{...inputProps}
								/>
							);
						}
					})()}
				</div>
				{error && (
					<div className='flex flex-row items-center gap-2 px-1 fade-in'>
						<Svg.TbAlertCircle size={16} color='#f87171 ' />
						<p className='text-red-400 text-xs'>{error}</p>
					</div>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';

export default Input;
