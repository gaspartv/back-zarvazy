class Id {
  id: string;
}

class BaseSentToApiPayload {
  business: Id;
  sender: Id;
  recipient: Id;
  sendBy?: "business" | "customer";
}

class Watermark {
  watermark: number;
}

export class ReceivedStatusPayload extends BaseSentToApiPayload {
  status: {
    timestamp: number;
    integrationId: string;
    sent?: Watermark;
    delivered?: Watermark;
    read?: Watermark;
  };
}

export class ReceivedMessagePayload extends BaseSentToApiPayload {
  message: {
    provider: "messenger" | "whatsapp" | "instagram";
    timestamp: number;
    integrationId: string;
    type: "text" | "attachment" | "postback" | "reply-to";
    text?: string;
    replyTo?: {
      integrationId: string;
    };
    attachment?: {
      type:
        | "template"
        | "audio"
        | "file"
        | "image"
        | "video"
        | "fallback"
        | "reel"
        | "ig_reel";
      title?: string;
      payload?: {
        url?: string;
      };
    };
  };
}
