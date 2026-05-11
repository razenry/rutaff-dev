"use client";

import { useState } from "react";
import { useAttendance } from "@/hooks/useAttendance";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Camera, CheckCircle2, History, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AttendancePage() {
  const { today, history, clockIn, isClockingIn, isLoadingToday, isLoadingHistory } = useAttendance();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleGetLocation = () => {
    setIsGettingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsGettingLocation(false);
          toast.success("Location acquired");
        },
        (error) => {
          console.error(error);
          setIsGettingLocation(false);
          toast.error("Failed to get location. Please enable GPS.");
        }
      );
    } else {
      setIsGettingLocation(false);
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  const handleClockIn = () => {
    if (!location) {
      toast.error("Please get your location first");
      return;
    }

    clockIn(
      {
        gps_lat: location.lat,
        gps_long: location.lng,
      },
      {
        onSuccess: () => {
          toast.success("Successfully clocked in!");
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Failed to clock in");
        },
      }
    );
  };

  if (isLoadingToday || isLoadingHistory) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Attendance</h2>
        <p className="text-muted-foreground">Clock in for your daily attendance.</p>
      </div>

      {today ? (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-primary">Already Clocked In</CardTitle>
            <CardDescription>You have completed your attendance for today.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-sm font-medium">
              Time: {new Date(today.created_at).toLocaleTimeString()}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Lat: {today.gps_lat}, Lng: {today.gps_long}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Clock In</CardTitle>
            <CardDescription>
              GPS and optional selfie validation required.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              <Button
                variant={location ? "outline" : "default"}
                className="w-full h-12 justify-start gap-3"
                onClick={handleGetLocation}
                disabled={isGettingLocation}
              >
                {isGettingLocation ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <MapPin className="h-5 w-5" />
                )}
                {location ? `Location: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : "Get Current Location"}
              </Button>

              <Button
                variant="outline"
                className="w-full h-12 justify-start gap-3"
                disabled
              >
                <Camera className="h-5 w-5" />
                Take Selfie (Coming Soon)
              </Button>

              <Button
                className="w-full h-12 mt-2 text-lg font-semibold"
                disabled={!location || isClockingIn}
                onClick={handleClockIn}
              >
                {isClockingIn ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
                Clock In Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Recent History</h3>
        </div>

        <div className="space-y-3">
          {history?.length > 0 ? (
            history.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card"
              >
                <div>
                  <p className="font-medium">{new Date(item.date).toLocaleDateString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.created_at).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                    {item.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg border border-dashed">
              No attendance history found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
