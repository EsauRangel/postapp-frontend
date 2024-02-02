import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import { Form } from "react-bootstrap";

export const InputApp = forwardRef((props, ref) => {
    const {
        name = "",
        title = "",
        value = "",
        type = "text",
        placeholder = "",
        infoText = "",
        errorText = "",
        required = "",
        maxLength = 100,
        minLength = 1,
        icon = null,
        iconWithSpace = null,
    } = props;

    let inputProps = { ...props };

    delete inputProps.iconWithSpace;
    delete inputProps.infoText;
    delete inputProps.name;
    delete inputProps.value;
    delete inputProps.errorText;

    const iconStyle = {
        float: "right",
        position: "relative",
        top: -35,
        right: 10,
    };

    const iconStyleWithSpace = {
        float: "right",
    };

    const styleWitdh = {
        width: iconWithSpace ? "80%" : "100%",
    };

    return (
        <Form.Group>
            <label
                htmlFor={`id-input-${name}`}
                style={{ fontSize: "12px", fontWeight: 500 ,marginTop:"0.5rem"}}
            >
                {title}
                {required ? " (*)" : ""}
                {!!title ? ":" : ""}
            </label>
            <input
                id={`id-input-${name}`}
                style={styleWitdh}
                name={name}
                ref={ref}
                className="input-app"
                maxLength={maxLength}
                minLength={minLength}
                type={type}
                placeholder={
                    !placeholder
                        ? `Ingrese ${title.toLowerCase()}`
                        : placeholder
                }
                value={value ? value : ""}
                {...inputProps}
            />

            {iconWithSpace && (
                <div style={iconStyleWithSpace}>{iconWithSpace}</div>
            )}

            {icon && <div style={iconStyle}>{icon}</div>}

            {errorText && (
                <Form.Text className={`text-error mb-2`}>{errorText}</Form.Text>
            )}
            {infoText && (
                <Form.Text className={`text-muted mb-2`}>{infoText}</Form.Text>
            )}
        </Form.Group>
    );
});

InputApp.propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.string,
    infoText: PropTypes.string,
    errorText: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
    autoComplete: PropTypes.string,
    iconWithSpace: PropTypes.any,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
};
