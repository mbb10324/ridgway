import { getClassification } from '@/utils/utils-helpers';
import React, { useMemo } from 'react';

type ClassificationMarkingProps = {
	classification?: string;
	customColor?: string;
	showBottom?: boolean;
};

// @stig V-222394 | The application must associate organization-defined types of security attributes having organization-defined security attribute values with information in process.
// @stig V-222643 | The application must have the capability to mark sensitive/classified output when required.
export default function ClassificationMarking(props: Readonly<ClassificationMarkingProps>) {
	const { classification, showBottom, customColor } = props;

	const classificationMarking = classification ?? getClassification();

	const bannerColor = useMemo(() => {
		if (customColor) {
			return customColor;
		}
		switch (classificationMarking) {
			case 'Unclassified':
				return 'bg-custom-unclassified';
			case 'CUI':
				return 'bg-custom-cui';
			case 'Classified':
				return 'bg-custom-classified';
			case 'Confidential':
				return 'bg-custom-confidential';
			case 'Secret':
				return 'bg-custom-secret';
			case 'Top Secret':
				return 'bg-custom-top-secret';
			default:
				return 'bg-custom-unclassified';
		}
	}, [classificationMarking, customColor]);

	// If no classification is set, don't render anything
	if (!classificationMarking) {
		return null;
	}

	return (
		<>
			<div className={`sticky top-0 text-sm ${bannerColor} text-white w-screen text-center z-50`}>
				{classificationMarking.toUpperCase()}
			</div>
			{showBottom && (
				<div className={`fixed bottom-0 text-sm ${bannerColor} text-white w-screen text-center z-50`}>
					{classificationMarking.toUpperCase()}
				</div>
			)}
		</>
	);
}
