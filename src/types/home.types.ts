export interface TodayGoal {
    targetMin: number;
    studiedMin: number;
}

export interface WeekGoal {
    targetMin: number;
    studiedMin: number;
}

export interface LastLesson {
    courseId: number;
    lessonId: number;
    sectionId: number;
    lessonTitle: string;
    sectionTitle: string;
    sectionType: string;
    overallProgressPercent: number;
    grammarPreview: string;
}

export interface HomeData {
    userFirstName: string;
    dailyStreak: number;
    todayGoal: TodayGoal;
    weekGoal: WeekGoal;
    weeklyAttendance: boolean[];
    lastLesson: LastLesson | null;
}

export interface HomeResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    data: HomeData | null;
    timestamp: string;
}