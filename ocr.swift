import Foundation
import Vision
import AppKit

let imageURL = URL(fileURLWithPath: "/Users/mac/.gemini/antigravity-ide/scratch/Classs95/public/TKB.jpg")
guard let nsImage = NSImage(contentsOf: imageURL),
      let cgImage = nsImage.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    print("Could not load image")
    exit(1)
}

let semaphore = DispatchSemaphore(value: 0)

let request = VNRecognizeTextRequest { request, error in
    defer { semaphore.signal() }
    guard let observations = request.results as? [VNRecognizedTextObservation] else { return }
    for observation in observations {
        if let topCandidate = observation.topCandidates(1).first {
            print(topCandidate.string)
        }
    }
}
request.recognitionLevel = .accurate
request.recognitionLanguages = ["vi-VN", "en-US"]

let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
try? handler.perform([request])
semaphore.wait()
