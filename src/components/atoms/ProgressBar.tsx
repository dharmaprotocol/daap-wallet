import React from "react";
import styled from "styled-components/macro";

type SubStep = number;
type Step = SubStep[];

interface ProgressBarProps {
  height: number;
  steps: Step[];
  currentStep: SubStep;
}

const ProgressBarWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const StepWrapper = styled.div<{ height: number }>`
  ${({ height }) => `
            height: ${height}px;
            border-radius: ${height / 2}px;
  `}
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.progressBar.backgroundColor};
`;

const Step: React.FC<{ progression: number }> = styled(StepWrapper)<{
  progression: number;
}>`
  flex: ${({ progression }) => progression};
  height: inherit;
  border-radius: inherit;
  background-color: ${({ theme }) => theme.progressBar.progressColor};
  transition: flex 0.3s ease-out;
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  height,
  steps,
  currentStep
}) => {
  return (
    <ProgressBarWrapper>
      {steps.map((step, index) => {
        return (
          <React.Fragment key={index}>
            {index !== 0 && <Separator />}
            <StepWrapper height={height}>
              <Step
                progression={
                  step.filter(subStep => subStep <= currentStep).length /
                  step.length
                }
              />
            </StepWrapper>
          </React.Fragment>
        );
      })}
    </ProgressBarWrapper>
  );
};

const Separator = styled.div`
  width: 5px;
`;
