import {render, screen, fireEvent} from "@testing-library/react";
import {beforeEach, vi, test, expect, describe} from "vitest";

import Layout from "../../src/Pages/Layout";
import { DateContext } from "../../src/Contexts/DateContext";
import { SettingsContext } from "../../src/Contexts/SettingsContext";

const mockDateContext = {
    currentDate: new Date(2024,11,11),
    selectedMonth: 11,
    setIsToday: vi.fn(),
    setSelectedMonth: vi.fn(),
    setSelectedYear: vi.fn(),
    setSelectedDay: vi.fn(),
    selectedYear: 2024,
};

const mockSettingsContext = {
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    labels: {
        newTodoButton: "New Todo",
        todaysTasks: "Today's Tasks",
    },
};

const mockChildren = {
    setDailyViewShow: vi.fn(),
    setAddTaskShow: vi.fn(),
    component: <div>Mock Component</div>,
    setStartDay: vi.fn(),
};

const mockHandleMonthChange = vi.fn();

describe("Layout component", () => {
    beforeEach(() => {
        render(
            <DateContext.Provider value={mockDateContext}>
                <SettingsContext.Provider value={mockSettingsContext}>
                    <Layout handleMonthChange={mockHandleMonthChange}>
                        {mockChildren}
                    </Layout>
                </SettingsContext.Provider>
            </DateContext.Provider>
        );
    });

    test("renders Layout component correctly", () => {
        expect(screen.getByText("December")).toBeInTheDocument();
        expect(screen.getByText("2024")).toBeInTheDocument();
        expect(screen.getByText(mockSettingsContext.labels.newTodoButton)).toBeInTheDocument();
        expect(screen.getByText(mockSettingsContext.labels.todaysTasks)).toBeInTheDocument();
    })
})