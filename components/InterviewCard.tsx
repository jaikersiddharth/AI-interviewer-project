import React from "react";
import Image from "next/image";
import { Feedback, InterviewCardProps } from "@/types";
import dayjs from "dayjs";
import { getRandomInterviewCover } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import DisplayTechIcons from "./displaytechicons";
export default function InterviewCard({ interviewId, userId, role, type, techstack, createdAt }: InterviewCardProps) {
    const feedback: Feedback | null = null;
    const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
    const formattedDate = dayjs(createdAt || Date.now()).format("MMM D, YYYY");
    return (
        <div className="card-border w-[360px] max-sm:w-full min-h-96">
            <div className="card-interview">
                <div>
                    <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                        <p className="badge-text">{normalizedType}</p>
                    </div>
                    <Image
                        src={getRandomInterviewCover()}
                        alt="Interview Cover"
                        width={90}
                        height={90}
                        className="rounded-full object-fit size-[90px]"
                    />
                    <h3 className="mt-5 capitalize">
                        {role} Interview
                    </h3>
                    <div className="flex flex-row gap-5 mt-3">
                        <div className="flex flex-row gap-2">
                            <Image src="/calendar.svg"
                                alt="Calendar Icon"
                                width={22}
                                height={22} />
                            <p>{formattedDate}</p>    
                        </div>
                        <div className="flex flex-row gap-2">
                            <Image 
                            src="/star.svg"
                            alt="Level Icon"
                            width={22}
                            height={22} />
                            <p>{feedback?.totalScore || '---'}/100</p>  

                        </div>
                </div>
                <p className="line-clamp-2 mt-5">
                    {feedback?.finalAssessment || 'Interview not yet finalized'}
                </p>
            </div>
            <div className="flex flex-row justify-between ">
            <DisplayTechIcons techstack={techstack} />
                        <Button className="btn-primary">
                            <Link
                                href={feedback ? `/interview/${interviewId}/feedback` : `/interview/${interviewId}`}
                                className="w-full block text-center"
                            >
                                {feedback ? "View Feedback" : "Take Interview"}
                            </Link>
                        </Button>
            </div>
        </div>
    </div>
    );
}