/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { createDecorator } from 'vs/platform/instantiation/common/instantiation';

export const IHeaderBarService = createDecorator<IHeaderBarService>(
	'headerBarService'
);

export interface IHeaderBarService {
	readonly _serviceBrand: undefined;
}
