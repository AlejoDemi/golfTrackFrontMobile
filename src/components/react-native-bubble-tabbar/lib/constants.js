"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultBackgroundColor = exports.defaultDisabledTabSize = exports.defaultActiveTabSize = exports.defaultIconRenderer = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const native_1 = tslib_1.__importDefault(require("styled-components/native"));
const dimensions_1 = require("./dimensions");
const defaultIconRenderer = ({ icon }) => {
    const isImageSource = (icon) => icon;
    if (!isImageSource(icon)) {
        return null;
    }
    return React.createElement(Icon, { source: icon });
};
exports.defaultIconRenderer = defaultIconRenderer;
const Icon = native_1.default.Image.attrs({
    resizeMode: 'contain',
}) `
  height: 18px;
  width: 18px;
`;
exports.defaultActiveTabSize = (dimensions_1.screenWidth) / 2.5;
exports.defaultDisabledTabSize = 30;
exports.defaultBackgroundColor = '#4a8a3f';
//# sourceMappingURL=constants.js.map