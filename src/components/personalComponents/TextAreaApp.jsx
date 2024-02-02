import PropTypes from "prop-types";
import React from "react";
import { Form } from "react-bootstrap";

export const TextAreaApp = (props) => {
    const {
        name = "",
        onChange = () => {},
        value = "",
        placeholder = "",
        required = false,
        disabled = false,
        title = "",
        infoText = "",
        errorText = "",
        autoComplete = "on",
        onEnter = () => {},
        height = "80px",
        style = {},
        maxLength =120
    } = props;

    return (
        <Form.Group>
            <label
                htmlFor={`id-input-textarea-${name}`}
                style={{ fontSize: "12px", fontWeight: 500,marginTop:"0.5rem" }}
            >
                {title}
            </label>
            <textarea
                id={`id-input-textarea-${name}`}
                className="input-app textarea-border"
                style={{ ...style, height }}
                required={required}
                placeholder={placeholder}
                autoComplete={autoComplete}
                disabled={disabled}
                name={name}
                maxLength={maxLength}
                value={value || ""}
                onChange={onChange}
                onKeyPress={onEnter}
            />
            {errorText && (
                <Form.Text className={`text-error mb-2`}>{errorText}</Form.Text>
            )}
            {infoText && (
                <Form.Text className={`text-muted mb-2`}>{infoText}</Form.Text>
            )}
        </Form.Group>
    );
};

TextAreaApp.propTypes = {
    placeholder: PropTypes.string,
    infoText: PropTypes.string,
    errorText: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    autoComplete: PropTypes.string,
    maxLength: PropTypes.number,
};
