module.exports = {
    "extends": [
        "@roots/bud-sass/stylelint-config",
        "@roots/sage/stylelint-config"
    ],
    "rules": {
        "custom-property-pattern": null,
        "scss/at-rule-no-unknown": true,
        "at-rule-no-unknown": null,
        "at-rule-name-space-after": "always-single-line",
        "at-rule-semicolon-newline-after": "always",
        "at-rule-name-case": "lower",
        "block-closing-brace-empty-line-before": "never",
        "block-closing-brace-newline-after": "always",
        "block-closing-brace-newline-before": "always-multi-line",
        "block-closing-brace-space-before": "always-single-line",
        "block-no-empty": true,
        "block-opening-brace-newline-after": "always-multi-line",
        "block-opening-brace-space-after": "always-single-line",
        "block-opening-brace-space-before": "always",
        "color-hex-case": "lower",
        "color-hex-length": "short",
        "color-no-invalid-hex": true,
        "comment-empty-line-before": [ "always", {
            except: ["first-nested"],
            ignore: ["stylelint-commands"],
        } ],
        "comment-no-empty": true,
        "comment-whitespace-inside": "always",
    }
};